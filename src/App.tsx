import { Button } from './components/ui/button'

export function App() {
  return (
    <div>
      <Button>Button</Button>
      <Button as={'a'} href={'http://google.com'}>
        Link
      </Button>
    </div>
  )
}
