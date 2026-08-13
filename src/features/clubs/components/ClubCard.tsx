import type { Club } from '../types';

interface ClubCardProps {
  club: Club;
  onClick: (club: Club) => void;
}

export function ClubCard({ club, onClick }: ClubCardProps) {
  return (
    <div 
      className="group flex flex-col rounded-2xl border border-gray-200 bg-white overflow-hidden cursor-pointer hover:shadow-md transition-all duration-200"
      onClick={() => onClick(club)}
    >
      <div className="relative h-48 w-full overflow-hidden">
        <img 
          src={club.image} 
          alt={club.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      
      <div className="flex flex-col p-5 space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Name</span>
          <span className="text-sm font-medium text-foreground text-right">{club.name}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Date & Time</span>
          <span className="text-sm font-medium text-foreground text-right">{club.dateTime}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Table</span>
          <span className="text-sm font-medium text-foreground text-right">{club.table}</span>
        </div>
        
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">Country</span>
          <span className="text-sm font-medium text-foreground text-right">{club.country}</span>
        </div>
        
        <div className="flex items-center justify-between pt-1">
          <span className="text-sm text-muted-foreground">Price</span>
          <span className="text-sm font-semibold text-foreground text-right">{club.price}</span>
        </div>
      </div>
    </div>
  );
}
