import { Button } from './components/ui/button'
import { Input } from './components/ui/input'

export function App() {
  return (
    <div style={{ margin: '30px', width: '500px' }}>
      <Button>Button</Button>
      <Button as={'a'} href={'http://google.com'}>
        Link
      </Button>
      <Input disabled id={'hello'} placeholder={'Input'} type={'password'} />
      <Input errorMessage={'hello'} placeholder={'Input search'} search />
    </div>
  )
}
