import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Settings, ChevronDown } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/popover-showcase')({
  component: PopoverShowcase,
})

function PopoverShowcase() {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false)
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
            <h1 className='text-3xl font-bold tracking-tight'>Popover Component Showcase</h1>
            <p className='text-muted-foreground mt-2'>
              Popover 컴포넌트의 구조, CSS 클래스, 사용 예시 상세 분석 (Tailwind CSS v4.1.11 기반)
            </p>
          </div>

          {/* Popover 구조 분석 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Popover 구조 분석
                <Badge variant='secondary'>shadcn/ui + Radix UI</Badge>
              </CardTitle>
              <CardDescription>
                Popover의 각 서브 컴포넌트와 실제 적용되는 CSS 클래스 분석
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              {/* 실제 Popover로 구조 시각화 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1. Popover 컴포넌트 구조 시각화</h3>
                <div className='p-6 bg-muted/30 rounded-lg border'>
                  <div className='text-sm text-muted-foreground mb-4'>
                    ⚠️ Popover는 실제로는 Portal로 body에 렌더링되지만, 여기서는 시각화를 위해 인라인으로 표시
                  </div>
                  
                  <div className='flex flex-col gap-4'>
                    <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
                      <PopoverTrigger asChild>
                        <Button 
                          variant='outline' 
                          className='w-fit bg-blue-50 dark:bg-blue-950 border-2 border-blue-300 border-dashed relative'
                        >
                          <div className='absolute -top-8 left-0 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap'>
                            PopoverTrigger
                          </div>
                          <Settings className='mr-2 h-4 w-4' />
                          Settings
                          <ChevronDown className='ml-2 h-4 w-4' />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className='w-80 bg-green-50 dark:bg-green-950 border-2 border-green-300 border-dashed relative'>
                        <div className='absolute -top-8 left-0 bg-green-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap'>
                          PopoverContent
                        </div>
                        <div className='space-y-4'>
                          <div className='space-y-2'>
                            <h4 className='font-medium leading-none'>Settings Panel</h4>
                            <p className='text-sm text-muted-foreground'>
                              Configure your preferences here.
                            </p>
                          </div>
                        </div>
                      </PopoverContent>
                    </Popover>
                    
                    <div className='text-sm text-muted-foreground'>
                      👆 PopoverTrigger를 클릭하면 PopoverContent가 나타납니다
                    </div>
                  </div>
                </div>
              </div>

              {/* CSS 클래스는 자동 적용 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2. CSS 클래스 자동 적용 여부</h3>
                <div className='p-4 bg-amber-50 dark:bg-amber-950 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚠️ 중요: CSS 클래스는 자동으로 적용됩니다</h4>
                  <div className='space-y-3 text-sm'>
                    <div>
                      <strong className='text-green-600'>✅ 자동 적용:</strong> Radix UI Popover + shadcn/ui 래핑으로 스타일이 내장됨
                    </div>
                    <div>
                      <strong className='text-blue-600'>🎨 커스텀:</strong> className prop과 각종 positioning props으로 조정 가능
                    </div>
                    <div className='mt-4 p-3 bg-white dark:bg-gray-800 rounded border'>
                      <pre className='text-xs'>{`// 기본 사용 (스타일 자동 적용)
<Popover>
  <PopoverTrigger asChild>
    <Button>Open</Button>
  </PopoverTrigger>
  <PopoverContent>
    Content here
  </PopoverContent>
</Popover>

// 커스텀 스타일 및 포지셔닝
<PopoverContent 
  className="w-96"
  side="top"
  align="start"
  sideOffset={10}
>
  Custom content
</PopoverContent>`}</pre>
                    </div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>


          {/* 각 컴포넌트의 실제 CSS 클래스 */}
          <Card>
            <CardHeader>
              <CardTitle>3. 각 컴포넌트의 실제 CSS 클래스 (Tailwind v4.1.11)</CardTitle>
              <CardDescription>실제 프로젝트에서 적용되는 모든 스타일 분석</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              {/* Popover Root */}
              <div className='p-4 bg-blue-50 dark:bg-blue-950 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>Popover (루트 컨테이너)</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`// shadcn이 자동으로 적용하는 속성
data-slot="popover"

// Radix UI Root가 제공하는 기능
- 상태 관리 (열림/닫힘)
- 포지셔닝 계산
- 키보드 접근성 (Escape 키)
- 포커스 관리`}</pre>
              </div>

              {/* PopoverTrigger */}
              <div className='p-4 bg-green-50 dark:bg-green-950 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>PopoverTrigger</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`// shadcn이 자동으로 적용하는 속성
data-slot="popover-trigger"

// Radix UI가 자동 설정하는 속성들
data-state="closed" | "open"
aria-expanded="false" | "true"
aria-haspopup="dialog"
type="button" (버튼인 경우)

// 실제 스타일링은 asChild로 위임된 자식 컴포넌트가 담당
// 대부분 Button 컴포넌트를 asChild로 사용`}</pre>
              </div>

              {/* PopoverContent - 가장 중요 */}
              <div className='p-4 bg-purple-50 dark:bg-purple-950 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>PopoverContent (메인 스타일링)</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`// shadcn이 적용하는 핵심 클래스들
bg-popover text-popover-foreground 
z-50 w-72 origin-(--radix-popover-content-transform-origin) 
rounded-md border p-4 shadow-md outline-hidden

// 애니메이션 클래스들
data-[state=open]:animate-in data-[state=closed]:animate-out
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
data-[side=bottom]:slide-in-from-top-2
data-[side=left]:slide-in-from-right-2
data-[side=right]:slide-in-from-left-2
data-[side=top]:slide-in-from-bottom-2

// Radix가 자동 설정하는 data 속성들
data-slot="popover-content"
data-state="open" | "closed"
data-side="top" | "right" | "bottom" | "left"
data-align="start" | "center" | "end"`}</pre>
                
                <div className='mt-4 space-y-2 text-xs'>
                  <h5 className='font-medium'>각 클래스의 실제 CSS 값:</h5>
                  <div className='grid gap-1'>
                    <div><span className='font-mono text-blue-600'>bg-popover:</span> background-color: var(--color-popover)</div>
                    <div><span className='font-mono text-green-600'>text-popover-foreground:</span> color: var(--color-popover-foreground)</div>
                    <div><span className='font-mono text-purple-600'>z-50:</span> z-index: 50</div>
                    <div><span className='font-mono text-orange-600'>w-72:</span> width: 18rem (288px)</div>
                    <div><span className='font-mono text-cyan-600'>rounded-md:</span> border-radius: 0.375rem (6px)</div>
                    <div><span className='font-mono text-pink-600'>border:</span> border-width: 1px; border-color: var(--color-border)</div>
                    <div><span className='font-mono text-red-600'>p-4:</span> padding: 1rem (16px)</div>
                    <div><span className='font-mono text-amber-600'>shadow-md:</span> box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1)</div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>



          {/* Props와 Positioning */}
          <Card>
            <CardHeader>
              <CardTitle>4. Props와 Positioning 옵션</CardTitle>
              <CardDescription>실제 사용 가능한 모든 Props와 기본값</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                
                <div className='p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>PopoverContent Props</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>포지셔닝:</strong></div>
                    <div className='ml-4'>• <code>side</code>: "top" | "right" | "bottom" | "left" (기본: "bottom")</div>
                    <div className='ml-4'>• <code>align</code>: "start" | "center" | "end" (기본: "center")</div>
                    <div className='ml-4'>• <code>sideOffset</code>: number (기본: 4)</div>
                    <div className='ml-4'>• <code>alignOffset</code>: number (기본: 0)</div>
                    <div className='ml-4'>• <code>avoidCollisions</code>: boolean (기본: true)</div>
                    <div className='ml-4'>• <code>sticky</code>: "partial" | "always" (기본: "partial")</div>
                    
                    <div className='mt-3'><strong>스타일링:</strong></div>
                    <div className='ml-4'>• <code>className</code>: string</div>
                    <div className='ml-4'>• <code>style</code>: CSSProperties</div>
                  </div>
                </div>

                <div className='p-4 bg-rose-50 dark:bg-rose-950 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>Popover Root Props</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>상태 관리:</strong></div>
                    <div className='ml-4'>• <code>open</code>: boolean (controlled)</div>
                    <div className='ml-4'>• <code>defaultOpen</code>: boolean (기본: false)</div>
                    <div className='ml-4'>• <code>onOpenChange</code>: (open: boolean) =&gt; void</div>
                    
                    <div className='mt-3'><strong>모달 설정:</strong></div>
                    <div className='ml-4'>• <code>modal</code>: boolean (기본: false)</div>
                    <div className='ml-4 text-gray-600'>- true: focus trap + backdrop</div>
                    <div className='ml-4 text-gray-600'>- false: non-modal 동작</div>
                  </div>
                </div>

              </div>
              
              <div className='p-4 bg-amber-50 dark:bg-amber-950 rounded-lg'>
                <h4 className='font-medium text-sm mb-3'>PopoverTrigger Props</h4>
                <div className='space-y-2 text-xs'>
                  <div><strong>필수:</strong></div>
                  <div className='ml-4'>• <code>asChild</code>: boolean (거의 항상 true)</div>
                  <div className='ml-4'>• <code>children</code>: ReactElement (버튼 등)</div>
                  
                  <div className='mt-3'><strong>자동 적용되는 접근성:</strong></div>
                  <div className='ml-4'>• aria-expanded 자동 설정</div>
                  <div className='ml-4'>• aria-haspopup="dialog" 자동 설정</div>
                  <div className='ml-4'>• Space/Enter 키 지원</div>
                </div>
              </div>

            </CardContent>
          </Card>



          {/* CSS Variables와 실제 값들 */}
          <Card>
            <CardHeader>
              <CardTitle>5. 실제 적용되는 CSS Values (프로젝트 커스텀)</CardTitle>
              <CardDescription>index.css에서 정의한 실제 색상값과 Tailwind v4 클래스</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <h4 className='font-medium mb-3'>CSS Variables (실제 프로젝트 값)</h4>
                  <div className='space-y-2 text-sm font-mono'>
                    <div className='text-blue-600 mb-2'>Light Mode:</div>
                    <div>--popover: <span className='text-gray-600'>oklch(1 0 0)</span> {/* 순수 흰색 */}</div>
                    <div>--popover-foreground: <span className='text-gray-600'>oklch(0.129 0.042 264.695)</span> {/* 진한 파란 회색 */}</div>
                    <div>--border: <span className='text-gray-600'>oklch(0.929 0.013 255.508)</span> {/* 연한 회색 */}</div>
                    
                    <div className='text-purple-600 mb-2 mt-4'>Dark Mode:</div>
                    <div>--popover: <span className='text-gray-400'>oklch(0.208 0.042 265.755)</span> {/* 진한 파란 회색 */}</div>
                    <div>--popover-foreground: <span className='text-gray-400'>oklch(0.984 0.003 247.858)</span> {/* 거의 흰색 */}</div>
                    <div>--border: <span className='text-gray-400'>oklch(1 0 0 / 10%)</span> {/* 투명한 흰색 */}</div>
                  </div>
                </div>

                <div className='p-4 bg-muted/50 rounded-lg'>
                  <h4 className='font-medium mb-3'>Tailwind v4 애니메이션 클래스</h4>
                  <div className='space-y-2 text-sm font-mono'>
                    <div>animate-in: <span className='text-green-600'>animation-duration: 150ms; animation-timing-function: ease-out</span></div>
                    <div>animate-out: <span className='text-green-600'>animation-duration: 150ms; animation-timing-function: ease-in</span></div>
                    <div>fade-in-0: <span className='text-green-600'>@starting-style opacity: 0</span></div>
                    <div>fade-out-0: <span className='text-green-600'>opacity: 0</span></div>
                    <div>zoom-in-95: <span className='text-green-600'>@starting-style scale: 0.95</span></div>
                    <div>zoom-out-95: <span className='text-green-600'>scale: 0.95</span></div>
                    <div>slide-in-from-top-2: <span className='text-green-600'>@starting-style transform: translateY(-0.5rem)</span></div>
                  </div>
                </div>

                <div className='p-4 bg-muted/50 rounded-lg md:col-span-2'>
                  <h4 className='font-medium mb-3'>Spacing & Sizing Values (Tailwind v4)</h4>
                  <div className='grid grid-cols-3 gap-4 text-sm font-mono'>
                    <div>
                      <div className='font-medium mb-2'>기본 크기:</div>
                      <div>w-72: <span className='text-blue-600'>18rem (288px)</span></div>
                      <div>p-4: <span className='text-blue-600'>1rem (16px)</span></div>
                      <div>rounded-md: <span className='text-blue-600'>0.375rem (6px)</span></div>
                    </div>
                    <div>
                      <div className='font-medium mb-2'>포지셔닝:</div>
                      <div>z-50: <span className='text-purple-600'>z-index: 50</span></div>
                      <div>sideOffset: <span className='text-purple-600'>4px (기본값)</span></div>
                      <div>origin-*: <span className='text-purple-600'>동적 계산</span></div>
                    </div>
                    <div>
                      <div className='font-medium mb-2'>그림자:</div>
                      <div>shadow-md: <span className='text-orange-600'>0 4px 6px -1px rgba(0,0,0,0.1), 0 2px 4px -1px rgba(0,0,0,0.06)</span></div>
                      <div>outline-hidden: <span className='text-orange-600'>outline: 2px solid transparent</span></div>
                    </div>
                  </div>
                </div>

              </div>

              <div className='p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg'>
                <h4 className='font-medium text-sm mb-3'>🎨 프로젝트 특징: OKLCH 색상 공간 사용</h4>
                <div className='text-xs space-y-2'>
                  <div>• <strong>OKLCH:</strong> 인간의 시각에 더 가까운 색상 표현</div>
                  <div>• <strong>더 정확한 명도:</strong> L(명도), C(채도), H(색조)로 구성</div>
                  <div>• <strong>색상 보간:</strong> 애니메이션 시 더 자연스러운 색상 변화</div>
                  <div>• <strong>접근성:</strong> 명도 기반으로 대비 계산이 더 정확</div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* Popover 사용 예시 */}
          <Card>
            <CardHeader>
              <CardTitle>Popover 사용 예시</CardTitle>
              <CardDescription>다양한 Popover 구성 패턴과 실제 사용 사례</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                
                {/* 기본 Popover */}
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium'>Basic Popover</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline'>
                        Info
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-80'>
                      <div className='space-y-2'>
                        <h4 className='font-medium'>Information</h4>
                        <p className='text-sm text-muted-foreground'>
                          This is a basic popover with some information.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 포지셔닝 예시 */}
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium'>Top Position</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline'>
                        Open Top
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side='bottom' align='start' sideOffset={4} className='w-auto'>
                      <div className='space-y-2 w-80'>
                        <h4 className='font-medium'>Top Positioned</h4>
                        <p className='text-sm text-muted-foreground'>
                          This popover opens above the trigger.
                        </p>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

                {/* 커스텀 너비 */}
                <div className='space-y-2'>
                  <h4 className='text-sm font-medium'>Custom Width</h4>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant='outline'>
                        Wide Popover
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className='w-96'>
                      <div className='space-y-4'>
                        <h4 className='font-medium'>Extra Wide Popover</h4>
                        <p className='text-sm text-muted-foreground'>
                          This popover has a custom width of w-96 (384px) instead of the default w-72.
                        </p>
                        <div className='flex gap-2'>
                          <Button size='sm'>Action 1</Button>
                          <Button size='sm' variant='outline'>Action 2</Button>
                        </div>
                      </div>
                    </PopoverContent>
                  </Popover>
                </div>

              </div>

            </CardContent>
          </Card>

          {/* 피그마 가이드 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                피그마 디자인 시스템 가이드
                <Badge variant='secondary'>Figma</Badge>
              </CardTitle>
              <CardDescription>Popover 컴포넌트를 피그마에서 구현하기 위한 완전한 가이드</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              {/* 피그마 컴포넌트 구조 */}
              <div className='p-4 bg-muted/50 rounded-lg'>
                <h4 className='font-medium mb-3'>실제 프로젝트 기반 피그마 구조</h4>
                <pre className='text-xs overflow-x-auto font-mono'>{`📁 Popover (src/components/ui/popover.tsx 기반)
├── 🎨 Popover/Trigger
│   └── asChild 패턴으로 버튼 컴포넌트 포함
├── 🎨 Popover/Content
│   ├── Variants: None (className으로만 커스텀)
│   ├── Props: side, align, sideOffset
│   └── 기본 크기: 288px (w-72)
└── 🎨 Popover/Complete
    └── Trigger + Content 조합

// 실제 사용되는 포지셔닝 옵션
├── side: top, right, bottom, left
├── align: start, center, end  
├── sideOffset: 4px (기본값)
└── className: 커스텀 스타일링`}</pre>
              </div>

              {/* Props 정보 */}
              <div className='p-4 bg-amber-50 dark:bg-amber-950 rounded-lg'>
                <h4 className='font-medium mb-3'>실제 Props (src/components/ui/popover.tsx)</h4>
                <div className='space-y-2 text-sm'>
                  <div><strong>Popover Root:</strong></div>
                  <div className='ml-4'>• <code>open</code> - boolean (controlled mode)</div>
                  <div className='ml-4'>• <code>defaultOpen</code> - boolean (uncontrolled)</div>
                  <div className='ml-4'>• <code>onOpenChange</code> - function</div>
                  <div className='ml-4'>• <code>modal</code> - boolean (기본: false)</div>
                  
                  <div className='mt-3'><strong>PopoverContent:</strong></div>
                  <div className='ml-4'>• <code>side</code> - "top" | "right" | "bottom" | "left"</div>
                  <div className='ml-4'>• <code>align</code> - "start" | "center" | "end"</div>
                  <div className='ml-4'>• <code>sideOffset</code> - number (기본: 4)</div>
                  <div className='ml-4'>• <code>className</code> - string</div>
                  
                  <div className='mt-3'><strong>PopoverTrigger:</strong></div>
                  <div className='ml-4'>• <code>asChild</code> - boolean (거의 항상 true)</div>
                </div>
              </div>

              {/* 개발 핸드오프 */}
              <div className='p-4 bg-blue-50 dark:bg-blue-950 rounded-lg'>
                <h4 className='font-medium mb-3'>개발 핸드오프 노트</h4>
                <div className='space-y-2 text-sm'>
                  <div>• <strong>Portal 렌더링:</strong> PopoverContent는 body 끝에 Portal로 렌더링</div>
                  <div>• <strong>애니메이션:</strong> Tailwind v4의 @starting-style 기반 등장/사라짐 효과</div>
                  <div>• <strong>포지셔닝:</strong> Floating UI 기반 자동 충돌 회피 및 위치 조정</div>
                  <div>• <strong>접근성:</strong> Radix UI 기반으로 ARIA 속성 자동 설정</div>
                  <div>• <strong>색상 시스템:</strong> OKLCH 색상 공간 사용으로 더 정확한 색상 표현</div>
                  <div>• <strong>키보드:</strong> Escape 키로 닫기, Space/Enter로 열기 지원</div>
                  <div>• <strong>포커스 관리:</strong> 열림 시 Content로, 닫힘 시 Trigger로 포커스 이동</div>
                </div>
              </div>

              {/* 실제 CSS 값 참고표 */}
              <div className='p-4 bg-green-50 dark:bg-green-950 rounded-lg'>
                <h4 className='font-medium mb-3'>디자인 토큰 참고표</h4>
                <div className='grid grid-cols-2 gap-4 text-xs font-mono'>
                  <div>
                    <div className='font-medium mb-2 text-blue-600'>기본 크기 (Tailwind v4):</div>
                    <div>w-72 = 288px</div>
                    <div>p-4 = 16px</div>
                    <div>rounded-md = 6px</div>
                    <div>sideOffset = 4px</div>
                    <div>z-50 = z-index: 50</div>
                  </div>
                  <div>
                    <div className='font-medium mb-2 text-purple-600'>색상 (OKLCH):</div>
                    <div>라이트: oklch(1 0 0) = #FFFFFF</div>
                    <div>다크: oklch(0.208...) = 진한 파란 회색</div>
                    <div>테두리: 라이트/다크 자동 전환</div>
                    <div>그림자: rgba 기반 반투명</div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </Main>
    </>
  )
}
