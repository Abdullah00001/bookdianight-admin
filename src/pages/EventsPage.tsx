import { useState } from 'react';
import { ChevronLeft, ChevronRight, Inbox, Loader2 } from 'lucide-react';
import { EventCard } from '@/features/events/components/EventCard';
import { EventDetailsModal } from '@/features/events/components/EventDetailsModal';
import { useEventsQuery } from '@/apis/events.api';
import type { Event } from '@/features/events/types';

type TabType = 'upcoming' | 'ongoing' | 'completed' | 'canceled';

const getEventStatusParam = (tab: TabType) => {
  switch (tab) {
    case 'upcoming': return 'UPCOMING';
    case 'ongoing': return 'ONGOING';
    case 'completed': return 'COMPLETED';
    case 'canceled': return 'CANCELED';
    default: return undefined;
  }
};

export default function EventsPage() {
  const [activeTab, setActiveTab] = useState<TabType>('ongoing');
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [page, setPage] = useState(1);

  const { data: response, isLoading } = useEventsQuery({
    page,
    limit: 10,
    eventStatus: getEventStatusParam(activeTab),
  });

  const events = response?.data || [];
  const meta = response?.meta;
  const totalPages = meta?.totalPages || 1;

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setPage(1);
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex items-center justify-end space-x-2 pt-6">
        <button
          onClick={() => setPage((p) => Math.max(1, p - 1))}
          disabled={page === 1}
          className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => setPage(p)}
            className={`h-8 w-8 flex items-center justify-center rounded font-medium ${
              page === p
                ? "bg-black text-white"
                : "bg-gray-100 text-muted-foreground hover:bg-gray-200"
            }`}
          >
            {p}
          </button>
        ))}

        <button
          onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          disabled={page === totalPages}
          className="h-8 w-8 flex items-center justify-center rounded bg-gray-100 text-muted-foreground hover:bg-gray-200 disabled:opacity-50"
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    );
  };

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
          onClick={() => handleTabChange('upcoming')}
          className={`pb-4 text-sm font-medium transition-colors relative ${
            activeTab === 'upcoming' ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          Upcoming
          {activeTab === 'upcoming' && (
            <span className="absolute bottom-0 left-0 w-full h-[2px] bg-black rounded-t-full" />
          )}
        </button>
        <button
          onClick={() => handleTabChange('ongoing')}
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
          onClick={() => handleTabChange('completed')}
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
          onClick={() => handleTabChange('canceled')}
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

      {isLoading ? (
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      ) : events.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {events.map((event) => (
              <EventCard 
                key={event.id} 
                event={event} 
                onClick={(e) => setSelectedEvent(e)} 
              />
            ))}
          </div>
          {renderPagination()}
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
