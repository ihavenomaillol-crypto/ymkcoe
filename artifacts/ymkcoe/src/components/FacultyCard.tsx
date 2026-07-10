import React from "react";

type FacultyCardProps = {
  name: string;
  designation: string;
  imageSrc: string;
  qualification?: string | null;
  experience?: string | null;
  expertise?: string | null;
  publications?: string | null;
  badgeText?: string;
  themeRing?: string;
};

export function FacultyCard({ 
  name, 
  designation, 
  imageSrc, 
  qualification,
  experience,
  expertise,
  publications
}: FacultyCardProps) {
  return (
    <div className="flex flex-col bg-card border border-border/50 rounded-2xl p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 gap-6 h-full">
      {/* Circular Image Container */}
      <div className="flex justify-center w-full">
        <div className="relative w-48 h-48 rounded-full overflow-hidden bg-muted border-4 border-muted">
          <img 
            src={imageSrc} 
            alt={name} 
            onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = "0"; }}
            className="w-full h-full object-cover object-top"
          />
        </div>
      </div>

      <div className="flex flex-col text-left w-full">
        <h3 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">{name}</h3>
        
        <div className="text-[13px] md:text-sm text-foreground space-y-2.5 leading-relaxed">
          <p>
            <span className="font-extrabold text-foreground">Designation: </span>
            <span className="text-muted-foreground">{designation}</span>
          </p>
          {qualification && (
            <p>
              <span className="font-extrabold text-foreground">Qualification: </span>
              <span className="text-muted-foreground">{qualification}</span>
            </p>
          )}
          {experience && (
            <p>
              <span className="font-extrabold text-foreground">Experience: </span>
              <span className="text-muted-foreground">{experience}</span>
            </p>
          )}
          {expertise && (
            <p>
              <span className="font-extrabold text-foreground">Expertise: </span>
              <span className="text-muted-foreground">{expertise}</span>
            </p>
          )}
          {publications && (
            <p>
              <span className="font-extrabold text-foreground">Publications: </span>
              <span className="text-muted-foreground">{publications}</span>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
