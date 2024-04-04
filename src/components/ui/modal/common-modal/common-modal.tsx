import { ModalContent, ModalContentProps, ModalRoot } from '../modal'

type CommonModalProps = ModalContentProps & {
  modalTitle: string
}

export const CommonModal = ({ children, modalTitle, ...restProps }: CommonModalProps) => {
  return (
    <ModalRoot {...restProps}>
      <ModalContent modalTitle={modalTitle}>{children}</ModalContent>
    </ModalRoot>
  )
}
