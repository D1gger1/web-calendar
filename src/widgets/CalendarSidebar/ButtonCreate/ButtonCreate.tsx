import styles from './ButtonCreate.module.scss';
import { useState } from 'react';
import { Modal } from '../../../shared/ui/Modal/Modal';
import { CreateEventModal } from '../../../features/createEvent/CreateEventModal';

export const ButtonCreate = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.sidebar}>
            <button className={styles.createButton} onClick={() => setIsOpen(true)}>
                <span className="material-symbols-outlined">
                    add
                </span>Create
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
                <CreateEventModal />
            </Modal>
        </div>
    )
}