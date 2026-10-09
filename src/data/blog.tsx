import type { ReactNode } from "react"

export interface BlogPost {
  slug: string
  title: string
  description: string
  date: string
  readTime: string
  tags: string[]
  content: ReactNode
}

export const blogPosts: BlogPost[] = [
  {
    slug: "building-thread-call",
    title:
      "Building Thread Call: What I Learned About WebRTC, Whisper and AI Summaries",
    description:
      "I wanted to learn WebRTC, so I built a Slack-like app with huddles that records, transcribes and summarizes calls. Here's the whole story, from theory to architecture.",
    date: "October 9, 2026",
    readTime: "20 min read",
    tags: [
      "WebRTC",
      "Go",
      "WebSocket",
      "whisper.cpp",
      "Architecture",
      "MinIO",
      "AI",
    ],
    content: (
      <article>
        <p>
          I'd never touched WebRTC before this project. I could have read the
          spec or followed a course, but that's not how I learn best. I learn by
          building something I actually want to exist.
        </p>

        <p>
          I'd always liked the idea of a Slack clone, so that became the
          vehicle. But a plain clone wouldn't have taught me much I hadn't seen
          before, so I asked myself what would make it more fun. The answer:
          when a huddle ends, the app should give you a summary of what was
          said. That's how <strong>Thread Call</strong> started.
        </p>

        <p>
          This post covers all of it: the WebRTC basics I had to learn first,
          the decisions I made along the way (and why), and how the whole thing
          fits together.
        </p>

        <h2>So what is Thread Call?</h2>

        <p>
          It's the same idea as my Slack clone, with channels, real-time
          messaging and huddles. The difference is what happens after a call.
          Background workers transcribe the recording, and an LLM turns the
          transcript into a summary.
        </p>

        <ul>
          <li>An HTTP API for auth, workspaces, channels and other CRUD</li>
          <li>WebSockets for real-time events and WebRTC signaling</li>
          <li>Browser-native peer-to-peer WebRTC for audio and video</li>
          <li>Recording in the browser, with files stored in object storage</li>
          <li>Background workers for transcription and summaries</li>
        </ul>

        <h2>What I needed to understand first</h2>

        <p>
          I assumed WebRTC would just connect two browsers and start sending
          audio. It's not that simple. A lot has to happen before the first
          packet of media moves.
        </p>

        <h3>What WebRTC does (and doesn't do)</h3>

        <p>
          WebRTC takes care of the real-time media part: capturing audio and
          video, finding a network path, encrypting everything, and sending it.
          What it doesn't do is help two peers find each other in the first
          place. That's your job, and it's called signaling.
        </p>

        <h3>SDP</h3>

        <p>
          SDP (Session Description Protocol) is just a block of text that
          describes a media session: what kinds of media, which codecs, and the
          settings needed to get going. The caller creates an{" "}
          <strong>offer</strong>, the other side replies with an{" "}
          <strong>answer</strong>, and now both know what the other can handle.
        </p>

        <h3>Signaling</h3>

        <p>
          Signaling is whatever channel you use to carry offers, answers and ICE
          candidates between peers. WebRTC doesn't care what it is. I used a Go
          WebSocket server.
        </p>

        <pre>
          <code>{`Peer A
   |
   | rtc.offer / rtc.ice
   v
Go WebSocket server
   |
   | rtc.offer / rtc.ice
   v
Peer B`}</code>
        </pre>

        <p>
          One thing that's easy to miss: in the normal case, my server never
          touches the audio or video. It only helps the browsers introduce
          themselves.
        </p>

        <h3>ICE, STUN and TURN</h3>

        <p>
          Most devices sit behind a NAT or firewall, so two browsers can't just
          call each other directly. ICE (Interactive Connectivity Establishment)
          is how WebRTC works around that. It collects possible network paths,
          called candidates, and tests them. There are three kinds:
        </p>

        <ul>
          <li>
            <strong>Host:</strong> addresses on your local network
          </li>
          <li>
            <strong>Server-reflexive:</strong> your public address, found with
            the help of a STUN server
          </li>
          <li>
            <strong>Relay:</strong> an address on a TURN server that passes
            media along for you
          </li>
        </ul>

        <pre>
          <code>{`STUN: "what do I look like from the public internet?"

Alice Browser ── STUN request ──► STUN server
Alice Browser ◄── "203.0.113.10:52143" ── STUN server`}</code>
        </pre>

        <p>
          STUN never carries your media. It just tells you your public address
          so a direct connection has a chance. When a direct path really isn't
          possible, say because of a symmetric NAT, TURN steps in and relays the
          media:
        </p>

        <pre>
          <code>{`Peer A ───────► TURN server ───────► Peer B
          media is relayed`}</code>
        </pre>

        <p>
          TURN is the fallback, not the first choice. Relaying all that traffic
          costs bandwidth, so you only want it when nothing else works.
        </p>

        <h2>The WebRTC lifecycle, step by step</h2>

        <p>
          This is the diagram I drew while figuring it out. Read it as two
          peers, with the signaling server sitting between them.
        </p>

        <Figure
          src="/webrtc-signalling-overview.png"
          alt="Two peers exchanging offer and answer through a WebSocket and HTTP signaling server, then exchanging ICE candidates until peers are connected"
          caption="The offer/answer exchange through the signaling server."
        />

        <h3>1. Grab the user's media</h3>

        <Code>
          {`const stream = await navigator.mediaDevices.getUserMedia({
  audio: true,
  video: true,
})`}
        </Code>

        <h3>2. Create the peer connection</h3>

        <Code>
          {`const peerConnection = new RTCPeerConnection({
  iceServers: [
    { urls: "stun:stun.l.google.com:19302" },
    {
      urls: [
        "turn:free.expressturn.com:3478?transport=udp",
        "turn:free.expressturn.com:3478?transport=tcp",
      ],
      username: import.meta.env.VITE_TURN_SERVER_USERNAME,
      credential: import.meta.env.VITE_TURN_SERVER_CREDENTIAL,
    },
  ],
})`}
        </Code>

        <h3>3. Add your tracks</h3>

        <Code>
          {`for (const track of stream.getTracks()) {
  peerConnection.addTrack(track, stream)
}`}
        </Code>

        <h3>4. Create the offer and set it locally</h3>

        <Code>
          {`const offer = await peerConnection.createOffer()
await peerConnection.setLocalDescription(offer)`}
        </Code>

        <p>
          This is the step that tripped me up the most.{" "}
          <strong>
            setLocalDescription() does not send the offer to anyone.
          </strong>{" "}
          It just tells your own browser, "this is my session description." As a
          side effect, it also starts ICE gathering.
        </p>

        <h3>5. ICE gathering starts</h3>

        <p>
          The moment the local description is set, the browser starts hunting
          for candidates. It doesn't wait for the answer. Each one gets sent
          through signaling as soon as it's found:
        </p>

        <Code>
          {`peerConnection.onicecandidate = (event) => {
  if (!event.candidate) return

  socket.send(
    JSON.stringify({
      msg_type: "rtc.ice",
      call_id: callId,
      candidate: event.candidate,
    }),
  )
}`}
        </Code>

        <h3>6. Send the offer</h3>

        <Code>
          {`socket.send(
  JSON.stringify({
    msg_type: "rtc.offer",
    call_id: callId,
    sdp: peerConnection.localDescription,
  }),
)`}
        </Code>

        <h3>7. Peer B receives it and sets the remote description</h3>

        <Code>
          {`await peerConnection.setRemoteDescription(
  new RTCSessionDescription(message.sdp),
)`}
        </Code>

        <p>This is how I finally remembered which is which:</p>

        <ul>
          <li>
            <code>setLocalDescription()</code> is <em>my</em> description
          </li>
          <li>
            <code>setRemoteDescription()</code> is <em>their</em> description
          </li>
        </ul>

        <h3>8. Peer B creates an answer and sends it back</h3>

        <Code>
          {`const answer = await peerConnection.createAnswer()
await peerConnection.setLocalDescription(answer)

socket.send(
  JSON.stringify({
    msg_type: "rtc.answer",
    call_id: callId,
    sdp: peerConnection.localDescription,
  }),
)`}
        </Code>

        <h3>9. Peer A applies the answer</h3>

        <Code>
          {`await peerConnection.setRemoteDescription(
  new RTCSessionDescription(message.sdp),
)`}
        </Code>

        <h3>10. Both sides keep trading ICE candidates</h3>

        <Code>
          {`await peerConnection.addIceCandidate(
  new RTCIceCandidate(message.candidate),
)`}
        </Code>

        <p>
          A gotcha worth knowing: a candidate can show up before the remote
          description has been set, and adding it too early throws an error.
          Queuing candidates until the remote description is in place saves you
          from some annoying, intermittent bugs.
        </p>

        <h3>11. Connectivity checks, then media</h3>

        <p>
          Now WebRTC tests pairs of candidates from both sides until one works.
          Once it has a winner, it sets up encryption with DTLS and starts
          sending media over SRTP.
        </p>

        <pre>
          <code>{`Candidate pair selected
        ↓
      DTLS   (key exchange)
        ↓
      SRTP   (encrypted media)
        ↓
  Audio / Video flowing`}</code>
        </pre>

        <h3>The same thing, with STUN and TURN added</h3>

        <p>
          This second diagram shows the full exchange. Peer A asks STUN who it
          is, finds out it's behind a symmetric NAT, and asks TURN for a relay.
          The offer, answer and ICE candidates then go through the signaling
          channel, while Peer B does its own STUN lookup.
        </p>

        <Figure
          src="/webrtc-full-exchange.png"
          alt="Sequence diagram of Peer A, STUN, TURN, the signal channel and Peer B exchanging SDP offer, answer and ICE candidates"
          caption="The full exchange, including STUN and TURN."
        />

        <p>
          One honest caveat: my numbered diagram puts ICE exchange near the end
          to keep it readable. In reality it overlaps with the offer and answer,
          because gathering starts right after the local description is set.
        </p>

        <h3>The error that made it click</h3>

        <Code>
          {`Failed to set remote answer SDP:
Called in wrong state: stable`}
        </Code>

        <p>
          I hit this one a lot. It means the connection isn't in the signaling
          state your code expects. Maybe an answer was applied twice, maybe
          messages arrived out of order, maybe two negotiations ran at once.
          Fixing it made me stop thinking of WebRTC as a single{" "}
          <code>connect()</code> call and start seeing it for what it is: a
          state machine that spans signaling, ICE and media transport.
        </p>

        <h2>Why I went peer-to-peer instead of using Pion</h2>

        <p>
          The obvious alternative was server-side WebRTC: run an SFU in Go with
          Pion, have everyone send media to my server, and let it forward the
          streams. I chose not to start there, for three reasons.
        </p>

        <h3>I wanted to learn it from 0 to 100</h3>

        <p>
          If I'd jumped straight to Pion, I'd have been running a media stack
          before understanding the basics. Starting with browser-native P2P
          forced me to learn SDP, signaling, ICE, STUN, TURN, DTLS and SRTP
          properly. Once that foundation feels solid, moving toward Pion is the
          plan.
        </p>

        <h3>My server capacity is small</h3>

        <p>
          With P2P, the browsers send media straight to each other, so that load
          lands on the clients instead of my server. My Go backend never has to
          receive and forward every audio and video packet.
        </p>

        <pre>
          <code>{`P2P                                SFU

Peer A ◄───────► Peer B            Peer A ───►
     direct media                              │
                                   Peer B ───► SFU ───► other peers
                                               │
                                   Peer C ───►`}</code>
        </pre>

        <p>
          That doesn't make the server free, though. Signaling, auth, call
          state, uploads, background jobs and any TURN relay traffic all still
          cost something.
        </p>

        <h3>It's a smaller system to start with</h3>

        <p>
          For a two-person call, P2P is the simplest thing that works. There's
          no media server to deploy or babysit.
        </p>

        <h3>Where P2P falls apart</h3>

        <p>
          In a mesh, every participant uploads a separate copy of their media to
          everyone else, so the cost grows fast as the call gets bigger. For
          larger group calls, an SFU like Pion, LiveKit or mediasoup is the
          right answer. So this isn't me claiming P2P is better. It's the right
          call for the scope I have today.
        </p>

        <h2>Recording and the background pipeline</h2>

        <p>Recording happens in the browser using the MediaRecorder API:</p>

        <Code>
          {`const recorder = new MediaRecorder(stream)

recorder.ondataavailable = (event) => {
  if (event.data.size > 0) {
    chunks.push(event.data)
  }
}

recorder.start()`}
        </Code>

        <p>
          When the huddle ends, those chunks become an audio file that gets
          uploaded to MinIO. I didn't want big audio files sitting in
          PostgreSQL, so the database only stores metadata and a reference,
          while MinIO holds the actual recording.
        </p>

        <p>
          Transcribing and summarizing both take a while, and I didn't want the
          request that ends a huddle to hang around waiting for them. So ending
          a call just finalizes the recording, uploads it, queues a background
          job and returns right away. A worker picks it up from there.
        </p>

        <pre>
          <code>{`User ends huddle
       ↓
Recording finalized
       ↓
Upload audio to MinIO
       ↓
Create background job
       ↓
Return control to user

Background worker
       ↓
Fetch audio from MinIO
       ↓
Speech-to-text
       ↓
Store transcript
       ↓
Summarize (when worthwhile)
       ↓
Store summary`}</code>
        </pre>

        <h2>Transcription: OpenRouter first, then whisper.cpp</h2>

        <p>
          My first version used OpenRouter for everything, both transcribing the
          audio and summarizing the text with an LLM. It worked, but the cost
          was too high for a personal project with no budget behind it.
        </p>

        <p>
          That pushed me to <strong>whisper.cpp</strong>, an open-source C/C++
          port of OpenAI's Whisper that runs locally. It won for three reasons:
        </p>

        <ul>
          <li>
            <strong>Cost.</strong> There's no per-minute bill. What I pay for is
            my own compute, storage and electricity.
          </li>
          <li>
            <strong>Control.</strong> The raw recording doesn't have to go to a
            third-party speech provider. To be clear, it's not fully private end
            to end: once I send a transcript to an external LLM, that text
            leaves my infrastructure. But the speech-to-text step stays local.
          </li>
          <li>
            <strong>Learning.</strong> I get to see what happens between an
            audio file and a transcript, instead of calling a black-box API.
          </li>
        </ul>

        <Code>
          {`./build/bin/whisper-cli \\
  -m models/ggml-tiny.bin \\
  -f ./recording.wav`}
        </Code>

        <p>
          On my Apple Silicon machine, whisper.cpp can use the GPU through
          Metal. One thing to plan for: browsers usually record WebM/Opus, but
          whisper.cpp wants 16 kHz WAV, so the worker needs a conversion step
          (ffmpeg works) before transcribing.
        </p>

        <h3>The trade-off</h3>

        <p>
          Running models locally isn't free in engineering terms. Now I have to
          think about model size, CPU and GPU load, memory, processing time and
          deployment. A hosted API would be simpler to operate and might be more
          accurate. For this project and this budget, though, local is the
          better fit.
        </p>

        <h2>Summaries, and not sending everything to an LLM</h2>

        <p>
          After transcription, the text can go to an LLM for a summary. But not
          every call deserves one. A ten-second "can you hear me?" shouldn't
          cost me tokens.
        </p>

        <p>
          The idea is a cheap filter in front of the LLM. It would look at
          things like transcript length, call duration, number of speakers,
          questions or action words, and whether the text is mostly noise or
          repeats. Only transcripts that pass get summarized; the rest are
          stored as they are. I want to be upfront that this is planned, not
          built yet, and I'm not going to pretend it's production-grade.
        </p>

        <h2>The full architecture</h2>

        <pre>
          <code>{`                     ┌──────────────┐
                     │   Frontend   │
                     └──────┬───────┘
                            │
             ┌──────────────┼──────────────┐
             ▼              ▼              ▼
          HTTP API      WebSocket        WebRTC
             │              │          (P2P media)
             └──────┬───────┘
                    ▼
               Go Backend
                    │
         ┌──────────┼───────────┐
         ▼          ▼           ▼
    PostgreSQL     Redis    Background jobs
                                │
                                ▼
                  MinIO (recordings) → fetch
                                │
                                ▼
                          whisper.cpp
                                │
                                ▼
                           Transcript
                                │
                                ▼
                     Cheap heuristic (planned)
                          │          │
                     not useful    useful
                          │          │
                     store only      ▼
                                    LLM
                                     │
                                     ▼
                                  Summary
                                     │
                                     ▼
                                PostgreSQL`}</code>
        </pre>

        <h3>Who does what</h3>

        <ul>
          <li>
            <strong>HTTP API:</strong> authentication, workspaces, channels and
            the usual CRUD.
          </li>
          <li>
            <strong>WebSocket hub:</strong> real-time events like{" "}
            <code>message.new</code>, <code>typing</code>,{" "}
            <code>rtc.offer</code>, <code>rtc.answer</code>,{" "}
            <code>rtc.ice</code>, <code>call.peer_left</code> and{" "}
            <code>call.ended</code>.
          </li>
          <li>
            <strong>WebRTC:</strong> the peer-to-peer audio and video, set up
            through the WebSocket hub.
          </li>
          <li>
            <strong>PostgreSQL:</strong> users, messages, call metadata,
            recording references, transcripts and summaries.
          </li>
          <li>
            <strong>Redis:</strong> fast shared state for the real-time layer.
          </li>
          <li>
            <strong>MinIO:</strong> the recordings themselves.
          </li>
          <li>
            <strong>Workers:</strong> everything slow, kept off the request
            path.
          </li>
          <li>
            <strong>whisper.cpp:</strong> local speech-to-text.
          </li>
          <li>
            <strong>LLM:</strong> summaries, only when they're worth paying for.
          </li>
        </ul>

        <h2>What building it actually taught me</h2>

        <ul>
          <li>
            Signaling and WebRTC are separate jobs. Mixing them up caused most
            of my early confusion.
          </li>
          <li>
            Negotiation is a state machine. Message ordering, duplicate answers
            and early ICE candidates are real problems, not edge cases.
          </li>
          <li>
            Moving slow work into background jobs is what keeps the app feeling
            fast.
          </li>
          <li>
            Cost is part of the architecture. It's literally what moved me from
            a hosted API to whisper.cpp.
          </li>
        </ul>

        <h2>What I'd do next</h2>

        <ul>
          <li>
            Stop shipping static TURN credentials in the frontend bundle and
            issue short-lived ones from my backend instead.
          </li>
          <li>
            Build the transcript filter and measure how many LLM calls it
            actually saves.
          </li>
          <li>
            Add retries and status tracking to the worker, so a failed
            transcription is visible and recoverable.
          </li>
          <li>
            Move toward an SFU with Pion if group calls become a real
            requirement.
          </li>
        </ul>

        <h2>Wrapping up</h2>

        <p>
          I set out to learn WebRTC and ended up with a project that touches
          real-time messaging, peer-to-peer media, object storage, background
          jobs, local AI inference and LLMs. Every choice came down to what I
          wanted to learn and what I could afford. I'm writing the reasoning
          down because that's the part I most want to keep getting better at.
        </p>
      </article>
    ),
  },
]

function Code({ children }: { children: string }) {
  return (
    <pre className="my-6 overflow-x-auto rounded-lg border border-[var(--p-rule)] bg-[var(--p-code-bg)] p-4 text-xs leading-6">
      <code>{children}</code>
    </pre>
  )
}

function Figure({
  src,
  alt,
  caption,
}: {
  src: string
  alt: string
  caption: string
}) {
  return (
    <figure className="my-8">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="w-full rounded-lg border border-[var(--p-rule)] bg-white"
      />
      <figcaption className="mt-2 text-xs text-[var(--p-muted)]">
        {caption}
      </figcaption>
    </figure>
  )
}
