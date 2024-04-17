import { ModalContent, ModalContentProps, ModalRoot } from '../modal'

type CommonModalProps = ModalContentProps & {
  modalTitle?: string
  onCloseHandler?: () => void
}

export const CommonModal = ({
  children,
  modalTitle,
  onCloseHandler,
  ...restProps
}: CommonModalProps) => {
  return (
    <ModalRoot {...restProps}>
      <ModalContent modalTitle={modalTitle} onCloseHandler={onCloseHandler}>
        {children}
      </ModalContent>
    </ModalRoot>
  )
}
