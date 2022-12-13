import { Alert } from "antd"

export default function ErrorDlg() {
  return (
    <Alert
      message="Server Error"
      description='Ошибка на стороне сервера. Попробуйте перезагрузить страницу или нажмите кнопку "ПОКАЗАТЬ ЕЩЕ 5 БИЛЕТОВ!"'
      type="error"
      showIcon
    />
  )
}
