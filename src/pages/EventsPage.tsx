import { useState } from 'react';
import { ChevronLeft, ChevronRight, Inbox } from 'lucide-react';
import { EventCard } from '@/features/events/components/EventCard';
import { EventDetailsModal } from '@/features/events/components/EventDetailsModal';
import { mockEvents } from '@/features/events/api/mock';
import type { Event } from '@/features/events/types';

type TabType = 'ongoing' | 'completed' | 'canceled';

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const filteredEvents = mockEvents.filter(event => event.status === activeTab);

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Event List</h2>
        <p className="text-muted-foreground">
          View the all ongoing, complete event list
        </p>
      </div>

      <div className="flex items-center space-x-8 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('ongoing')}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === 'ongoing' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Ongoing Events
          {activeTab === 'ongoing' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('completed')}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === 'completed' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Completed
          {activeTab === 'completed' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('canceled')}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === 'canceled' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Canceled
          {activeTab === 'canceled' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-t-full" />
          )}
        </button>
      </div>

      {filteredEvents.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={(e) => setSelectedEvent(e)} 
              />
            ))}
          </div>

          <div className="flex items-center justify-end space-x-2 pt-6">
            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200">
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded bg-black text-white font-medium">
              1
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 font-medium">
              2
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 font-medium">
              3
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 font-medium">
              4
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 font-medium">
              5
            </button>
            <button className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200">
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="bg-gray-100 p-4 rounded-full mb-4">
            <Inbox className="h-8 w-8 text-muted-foreground" />
          </div>
          <p className="text-xl font-semibold text-foreground">No data found</p>
          <p className="text-muted-foreground mt-2">There are currently no events in this category.</p>
        </div>
      )}

      <EventDetailsModal 
        isOpen={!!selectedEvent} 
        onClose={() => setSelectedEvent(null)} 
        event={selectedEvent} 
      />
    </div>
  );
}
