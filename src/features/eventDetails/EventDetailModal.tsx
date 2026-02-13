import { useState } from 'react';
import { useEventStore } from '../../entities/event/model/eventStore';
import { useNotificationStore } from '../../entities/notification/notificationStore';
import { EventInfoView } from './EventInfoView/EventInfoView';
import { CreateEventModal } from '../createEvent/CreateEventModal';
import { DeleteConfirmModal } from './DeletConfirmModal/DeleteConfirmModal';
import styles from './EventDetail.module.scss';

export const EventDetailsModal = () => {
  const { selectedEvent, clearSelectedEvent, deleteEvent } = useEventStore();
  const { showNotification } = useNotificationStore();

  const [mode, setMode] = useState<'view' | 'edit' | 'delete'>('view');

  if (!selectedEvent) return null;

  const handleFullClose = () => {
    setMode('view');
    clearSelectedEvent();
  };

  const confirmDelete = () => {
    if (selectedEvent) {
      deleteEvent(selectedEvent.id);

      if (showNotification) {
        showNotification('Event deleted successfully');
      }

      handleFullClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleFullClose}>
      <div onClick={(e) => e.stopPropagation()}>

        {mode === 'view' && (
          <EventInfoView
            onEdit={() => setMode('edit')}
            onDelete={() => setMode('delete')}
            onClose={handleFullClose}
            className={styles.eventInfoView}
          />
        )}

        {mode === 'edit' && (
          <CreateEventModal
            isEditMode={true}
            onClose={() => setMode('view')}
            className={styles.createEventModal}
          />
        )}

        {mode === 'delete' && (
          <DeleteConfirmModal
            title="Delete Event"
            description={`Are you sure you want to delete ${selectedEvent.title}? You'll no longer have access to it. `}
            onConfirm={confirmDelete}
            onCancel={() => setMode('view')}
            className={styles.deleteConfirmModal}
          />
        )}
      </div>
    </div >
  );
};