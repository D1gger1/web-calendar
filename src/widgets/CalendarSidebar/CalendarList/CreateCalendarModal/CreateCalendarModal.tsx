import { useState } from 'react';
import { Modal } from '../../../../shared/ui/Modal/Modal';
import { ColorPicker } from '../../../../shared/ui/ColourPicker/ColorPicker';
import styles from './CreateCalendarModal.module.scss';
import imgColorPicker from '../../../../assets/ColorPicker.svg';
import imgTitle from '../../../../assets/title.png';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const DEFAULT_COLORS = [
  '#9F2957', '#D90056', '#E25D33', '#DFC45A',
  '#B8C42F', '#16AF6E', '#429488', '#397E49',
  '#439BDF', '#6C7AC4', '#8332A4', '#6F42C1',
];

export const CreateCalendarModal = ({ isOpen, onClose }: Props) => {
  const [title, setTitle] = useState('');
  const [color, setColor] = useState(DEFAULT_COLORS[0]);

  const handleClose = () => {
    setTitle('');
    setColor(DEFAULT_COLORS[0]);
    onClose();
  };

  const handleSave = () => {
    handleClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleClose} className={styles.wrapper}>
      <h2 className={styles.header}>Create calendar</h2>

      <div className={styles.containerTitle}>
        <label className={styles.labelTitle}>Title</label>
        <img src={imgTitle} alt="title" className={styles.imgTitle} />
        <input
          className={styles.inputTitle}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
      </div>

      <div className={styles.containerColor}>
        <label className={styles.labelColor}>Color</label>
        <img src={imgColorPicker} alt="ColorPicker" className={styles.imgColor} />
        <ColorPicker
          value={color}
          onChange={setColor}
          presetColors={DEFAULT_COLORS}
          className={styles.colorPicker}
        />
      </div>

      <div className={styles.footer}>
        <button className={styles.btnSave} onClick={handleSave}>
          Save
        </button>
      </div>
    </Modal>
  );
};
