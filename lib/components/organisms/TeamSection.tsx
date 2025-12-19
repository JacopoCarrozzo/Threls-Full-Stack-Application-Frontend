import { MemberCard } from "../molecules/MemberCard";
import { Heading } from "../atoms/Heading";

interface TeamSectionProps {
  title: string;
  members: any[];      
  teamData: any[];     
  columns: string;    
  showBio: boolean;
}

export const TeamSection = ({title, members, teamData, columns, showBio}: TeamSectionProps) => {
  
  const gridColsMap: { [key: string]: string } = {
    "2": "md:grid-cols-2",
    "3": "md:grid-cols-3",
    "4": "md:grid-cols-4",
  };

  const gridCols = gridColsMap[columns] || "md:grid-cols-3";

  return (
    <section className="py-24 bg-gradient-to-b from-purple-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-6">
        <Heading 
          content={title} 
          level="h2" 
          className="mb-20" 
        />
        
        <div className={`grid grid-cols-1 ${gridCols} gap-12 lg:gap-16`}>
          {members.map((item: any, i: number) => {
            const memberId = Number(item.team_member_id);
            const member = teamData.find((m: any) => m.id === memberId);
            
            if (!member) return null;

            return (
              <MemberCard 
                key={i} 
                member={member} 
                showBio={showBio} 
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};