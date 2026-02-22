import { Card } from "@/components/ui/card";
import { Section } from "@/components/common/Section";
import { SectionHeader } from "./common/SectionHeader";

const education = [
  {
    degree: "Bachelor of Computer Application (BCA)",
    institution: "LA Grandee International College",
    period: "2021 – 2025",
    cgpa: "3.12",
  },
  {
    degree: "+2 Management",
    institution: "Sagarmatha Higher Secondary College",
    period: "2019 – 2021",
    cgpa: "3.12",
  },
  {
    degree: "SEE",
    institution: "Pokhara Academy",
    period: "2009 – 2019",
    cgpa: "3.7",
  },
];

export default function EducationSection() {
  return (
    <Section id="education">
      <SectionHeader number="05." title="Education" />
      <div className="grid md:grid-cols-3 gap-6">
        {education.map((edu, idx) => (
          <Card key={idx} className="p-6">
            <h3 className="font-bold text-lg mb-1">{edu.degree}</h3>
            <p className="text-muted-foreground mb-1">{edu.institution}</p>
            <p className="text-sm text-muted-foreground">
              {edu.period} | CGPA: {edu.cgpa}
            </p>
          </Card>
        ))}
      </div>
    </Section>
  );
}
