type ModalProps = {
  handleCloseModal: () => void;
  children: React.ReactNode;
};

export const Modal: React.FC<ModalProps> = ({ handleCloseModal, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold">モーダルのタイトル</h2>
        {children}
        <button
          onClick={handleCloseModal}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          閉じる
        </button>
      </div>
    </div>
  );
};
