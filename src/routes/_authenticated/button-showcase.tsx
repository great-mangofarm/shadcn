import { createFileRoute } from '@tanstack/react-router'
import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Heart, Download, Trash2, Settings, Plus, X } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/button-showcase')({
  component: ButtonShowcase,
})

function ButtonShowcase() {
  return (
    <>
      <Header>
        <TopNav links={[]} />
        <div className='ml-auto flex items-center space-x-4'>
          <Search />
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='space-y-8'>
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Button Showcase</h1>
            <p className='text-muted-foreground mt-2'>
              All button variants and sizes used in this project
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Button Variants
                <Badge variant='secondary'>6 types</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>default</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>variant="default"</code>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button variant='default'>Primary Button</Button>
                  <Button variant='default' disabled>Disabled</Button>
                  <Button variant='default'>
                    <Download />
                    With Icon
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Primary action button with solid background
                </p>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='destructive'>destructive</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>variant="destructive"</code>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button variant='destructive'>Delete</Button>
                  <Button variant='destructive' disabled>Disabled</Button>
                  <Button variant='destructive'>
                    <Trash2 />
                    Delete Item
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Dangerous actions like delete, remove, etc.
                </p>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>outline</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>variant="outline"</code>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button variant='outline'>Secondary</Button>
                  <Button variant='outline' disabled>Disabled</Button>
                  <Button variant='outline'>
                    <Settings />
                    Settings
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Secondary actions with border
                </p>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='secondary'>secondary</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>variant="secondary"</code>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button variant='secondary'>Secondary</Button>
                  <Button variant='secondary' disabled>Disabled</Button>
                  <Button variant='secondary'>
                    <Plus />
                    Add Item
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Alternative primary button style
                </p>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>ghost</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>variant="ghost"</code>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button variant='ghost'>Ghost Button</Button>
                  <Button variant='ghost' disabled>Disabled</Button>
                  <Button variant='ghost'>
                    <X />
                    Cancel
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Text-only button, shows background on hover
                </p>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>link</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>variant="link"</code>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button variant='link'>Link Button</Button>
                  <Button variant='link' disabled>Disabled</Button>
                  <Button variant='link'>
                    <Heart />
                    Like this
                  </Button>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Looks like a link with underline on hover
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Button Sizes
                <Badge variant='secondary'>4 sizes</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>sm</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>size="sm"</code>
                  <span className='text-sm text-muted-foreground'>h-8 (32px)</span>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button size='sm'>Small Button</Button>
                  <Button size='sm' variant='outline'>Small Outline</Button>
                  <Button size='sm' variant='ghost'>
                    <Settings />
                    Small Ghost
                  </Button>
                </div>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>default</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>size="default"</code>
                  <span className='text-sm text-muted-foreground'>h-9 (36px)</span>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button>Default Button</Button>
                  <Button variant='outline'>Default Outline</Button>
                  <Button variant='ghost'>
                    <Plus />
                    Default Ghost
                  </Button>
                </div>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>lg</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>size="lg"</code>
                  <span className='text-sm text-muted-foreground'>h-10 (40px)</span>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button size='lg'>Large Button</Button>
                  <Button size='lg' variant='outline'>Large Outline</Button>
                  <Button size='lg' variant='ghost'>
                    <Download />
                    Large Ghost
                  </Button>
                </div>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>icon</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>size="icon"</code>
                  <span className='text-sm text-muted-foreground'>size-9 (36x36px)</span>
                </div>
                <div className='flex items-center gap-4 flex-wrap'>
                  <Button size='icon'>
                    <Heart />
                  </Button>
                  <Button size='icon' variant='outline'>
                    <Settings />
                  </Button>
                  <Button size='icon' variant='ghost'>
                    <X />
                  </Button>
                  <Button size='icon' variant='destructive'>
                    <Trash2 />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
