export interface ModalProps {
  button_id?: string;
  modal_id?: string;
  text?: string;
  button_text?: string;
}

export function Modal(props: ModalProps) {
  return (
    <div>
      <button
        type="button"
        id={props.button_id}
        class="btn"
        onClick={() => {
          const modal = props.modal_id ? document.getElementById(props.modal_id) : null;
          if (modal instanceof HTMLDialogElement) {
            modal.showModal();
          }
        }}
      >
        {props.button_text}
      </button>
      <dialog id={props.modal_id} class="modal">
        <form method="dialog" class="modal-box">
          <p class="py-4">{props.text}</p>
          <div class="modal-action">
            <button type="submit" class="btn">Close</button>
          </div>
        </form>
      </dialog>
    </div>
  );
}
