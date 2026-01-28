import { useState } from 'react';
import { useEventStore } from '../../entities/event/model/eventStore';
import { EventInfoView } from './EventInfoView/EventInfoView';
import { CreateEventModal } from '../createEvent/CreateEventModal'; 
import { DeleteConfirmModal } from './DeletConfirmModal/DeleteConfirmModal';
import styles from './EventDetail.module.scss'

export const EventDetailsModal = () => {
  const { selectedEvent, clearSelectedEvent } = useEventStore();
  const [mode, setMode] = useState<'view' | 'edit' | 'delete'>('view');

  if (!selectedEvent) return null;

  const handleFullClose = () => {
    setMode('view');
    clearSelectedEvent();
  };

  return (
    <div className={styles.overlay} onClick={handleFullClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        
        {mode === 'view' && (
          <EventInfoView 
            onEdit={() => setMode('edit')} 
            onDelete={() => setMode('delete')}
            onClose={handleFullClose}
          />
        )}

        {mode === 'edit' && (
          <CreateEventModal 
            isEditMode={true} 
            onClose={() => setMode('view')} 
          />
        )}

        {mode === 'delete' && (
          <DeleteConfirmModal 
            eventTitle={selectedEvent.title}
            onConfirm={handleFullClose} 
            onCancel={() => setMode('view')} 
          />
        )}
        
      </div>
    </div>
  );
};