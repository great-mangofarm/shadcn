import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectLabel,
  SelectSeparator,
  SelectGroup
} from '@/components/ui/select'
import { ChevronDownIcon } from 'lucide-react'
import { useState } from 'react'

export const Route = createFileRoute('/_authenticated/select-showcase')({
  component: SelectShowcase,
})

function SelectShowcase() {
  const [selectedValue, setSelectedValue] = useState<string>('')

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
            <h1 className='text-3xl font-bold tracking-tight'>Select Component Showcase</h1>
            <p className='text-muted-foreground mt-2'>
              Select 컴포넌트의 구조, CSS 클래스, 사용 예시 상세 분석 (Tailwind CSS v4.1.11 기반)
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Select 구조 분석
                <Badge variant='secondary'>shadcn/ui + Radix UI</Badge>
              </CardTitle>
              <CardDescription>
                Select의 각 서브 컴포넌트와 실제 적용되는 CSS 클래스 분석
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1. Select 컴포넌트 구조 시각화</h3>
                <div className='p-6 bg-muted/30 rounded-lg border'>
                  <div className='text-sm text-muted-foreground mb-4'>
                    ⚠️ SelectContent는 실제로는 Portal로 body에 렌더링되지만, 여기서는 시각화를 위해 인라인으로 표시
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Select value={selectedValue} onValueChange={setSelectedValue}>
                      <SelectTrigger className='w-[200px] bg-blue-50 border-2 border-blue-300 border-dashed relative'>
                        <div className='absolute -top-8 left-0 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap'>
                          SelectTrigger
                        </div>
                        <div className='bg-green-100 px-2 py-1 rounded border border-green-300 relative'>
                          <div className='absolute -top-6 left-0 bg-green-600 text-white px-1 rounded text-xs font-bold'>
                            SelectValue
                          </div>
                          <SelectValue placeholder="옵션을 선택하세요" />
                        </div>
                        <div className='bg-purple-100 p-1 rounded border border-purple-300 relative ml-2'>
                          <div className='absolute -top-6 left-0 bg-purple-600 text-white px-1 rounded text-xs font-bold'>
                            Icon
                          </div>
                          <ChevronDownIcon className='h-4 w-4' />
                        </div>
                      </SelectTrigger>
                      <SelectContent className='bg-orange-50 border-2 border-orange-300 border-dashed relative'>
                        <div className='absolute -top-8 left-0 bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap'>
                          SelectContent
                        </div>
                        <SelectGroup>
                          <SelectLabel className='bg-cyan-100 px-2 py-1 rounded border border-cyan-300 relative'>
                            <div className='absolute -top-6 left-0 bg-cyan-600 text-white px-1 rounded text-xs font-bold'>
                              SelectLabel
                            </div>
                            과일
                          </SelectLabel>
                          <SelectItem value="apple" className='bg-pink-100 border border-pink-300 border-dashed relative'>
                            <div className='absolute -top-6 left-0 bg-pink-600 text-white px-1 rounded text-xs font-bold'>
                              SelectItem
                            </div>
                            사과
                          </SelectItem>
                          <SelectItem value="banana" className='bg-pink-100 border border-pink-300 border-dashed relative'>
                            <div className='absolute -top-6 left-0 bg-pink-600 text-white px-1 rounded text-xs font-bold'>
                              SelectItem
                            </div>
                            바나나
                          </SelectItem>
                        </SelectGroup>
                        <SelectSeparator className='bg-red-100 border border-red-300 border-dashed relative my-2'>
                          <div className='absolute -top-6 left-0 bg-red-600 text-white px-1 rounded text-xs font-bold'>
                            SelectSeparator
                          </div>
                        </SelectSeparator>
                        <SelectGroup>
                          <SelectLabel className='bg-cyan-100 px-2 py-1 rounded border border-cyan-300'>채소</SelectLabel>
                          <SelectItem value="carrot" className='bg-pink-100 border border-pink-300 border-dashed'>당근</SelectItem>
                          <SelectItem value="lettuce" className='bg-pink-100 border border-pink-300 border-dashed'>상추</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <div className='text-sm text-muted-foreground'>
                      👆 SelectTrigger를 클릭하면 SelectContent가 나타납니다. 선택된 값: <span className='font-mono bg-gray-100 px-1 rounded'>{selectedValue || 'null'}</span>
                      <br />
                      ⚠️ 실제 사용 시에는 SelectTrigger에 고정 너비(w-[200px] 등)를 지정해야 합니다. 선택값에 따라 너비가 변하면 안 됩니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2. CSS 클래스 자동 적용 여부</h3>
                <div className='p-4 bg-amber-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚠️ 중요: CSS 클래스는 자동으로 적용됩니다</h4>
                  <div className='space-y-3 text-sm'>
                    <div>
                      <strong className='text-green-600'>✅ 자동 적용:</strong> Radix UI Select + shadcn/ui 래핑으로 스타일이 내장됨
                    </div>
                    <div>
                      <strong className='text-blue-600'>🎨 커스텀:</strong> className prop과 size prop으로 조정 가능
                    </div>
                    <div className='mt-4 p-3 bg-white rounded border'>
                      <pre className='text-xs'>{`// 기본 사용 (스타일 자동 적용)
<Select>
  <SelectTrigger>
    <SelectValue placeholder="선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">옵션 1</SelectItem>
  </SelectContent>
</Select>

// 커스텀 스타일 및 사이즈
<SelectTrigger 
  size="sm"
  className="w-64"
>
  <SelectValue placeholder="작은 사이즈" />
</SelectTrigger>`}</pre>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>3. 각 컴포넌트의 실제 CSS 클래스 (Tailwind v4.1.11)</CardTitle>
              <CardDescription>실제 프로젝트에서 적용되는 모든 스타일 분석</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='p-4 bg-blue-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>Select (루트 컨테이너)</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 자동으로 적용하는 속성
data-slot= "select "

// Radix UI Root가 제공하는 기능
- 상태 관리 (열림/닫힘/선택값)
- 키보드 네비게이션 (Arrow keys, Enter, Space)
- 접근성 (ARIA 속성 자동 설정)
- 포커스 관리`}</pre>
              </div>

              <div className='p-4 bg-green-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>SelectTrigger (메인 버튼)</h4>
                <div className='p-3 bg-orange-100 rounded mb-3 text-xs'>
                  <strong>⚠️ 중요:</strong> SelectTrigger는 항상 고정 너비를 가져야 합니다. shadcn 기본 설정에서 <code>w-fit</code>를 사용하지만,
                  실제 사용 시에는 <code>className= "w-[200px] "</code> 같은 고정 너비를 지정해야 선택값에 따라 레이아웃이 변하지 않습니다.
                </div>
                <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 핵심 클래스들
border-input data-[placeholder]:text-muted-foreground 
[&_svg:not([class*='text-'])]:text-muted-foreground 
focus-visible:border-ring focus-visible:ring-ring/50 
aria-invalid:ring-destructive/20 aria-invalid:border-destructive 
flex w-fit items-center justify-between gap-2 rounded-md border 
bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs 
transition-[color,box-shadow] outline-none focus-visible:ring-[3px] 
disabled:cursor-not-allowed disabled:opacity-50 
data-[size=default]:h-9 data-[size=sm]:h-8

// 내부 요소 스타일링
*:data-[slot=select-value]:line-clamp-1 
*:data-[slot=select-value]:flex 
*:data-[slot=select-value]:items-center 
*:data-[slot=select-value]:gap-2
[&_svg]:pointer-events-none [&_svg]:shrink-0 
[&_svg:not([class*='size-'])]:size-4

// Radix가 자동 설정하는 data 속성들
data-slot= "select-trigger "
data-size= "default " |  "sm "
data-state= "closed " |  "open "
data-placeholder (placeholder 상태일 때)
aria-expanded= "false " |  "true "
aria-haspopup= "listbox "`}</pre>

                <div className='mt-4 space-y-2 text-xs'>
                  <h5 className='font-medium'>각 클래스의 실제 CSS 값 (프로젝트 기준):</h5>
                  <div className='grid gap-1'>
                    <div><span className='font-mono text-blue-600'>border-input:</span> border-color: oklch(0.929 0.013 255.508) - 연한 회색</div>
                    <div><span className='font-mono text-green-600'>text-muted-foreground:</span> color: oklch(0.554 0.046 257.417) - 중간 회색</div>
                    <div><span className='font-mono text-purple-600'>focus-visible:ring-ring/50:</span> box-shadow: 0 0 0 3px oklch(0.704 0.04 256.788 / 0.5)</div>
                    <div><span className='font-mono text-orange-600'>h-9:</span> height: 36px (기본 사이즈)</div>
                    <div><span className='font-mono text-cyan-600'>h-8:</span> height: 32px (작은 사이즈)</div>
                    <div><span className='font-mono text-pink-600'>px-3:</span> padding-left/right: 12px</div>
                    <div><span className='font-mono text-red-600'>py-2:</span> padding-top/bottom: 8px</div>
                    <div><span className='font-mono text-amber-600'>rounded-md:</span> border-radius: 8px (--radius-md)</div>
                    <div><span className='font-mono text-indigo-600'>gap-2:</span> gap: 8px</div>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-purple-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>SelectContent (드롭다운 패널)</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 핵심 클래스들
bg-popover text-popover-foreground 
data-[state=open]:animate-in data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 
relative z-50 max-h-(--radix-select-content-available-height) 
min-w-[8rem] origin-(--radix-select-content-transform-origin) 
overflow-x-hidden overflow-y-auto rounded-md border shadow-md

// position="popper" 일 때 추가 클래스들
data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 
data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1

// Radix가 자동 설정하는 속성들
data-slot="select-content"
data-state= "open" | "closed "
data-side= "top " |  "right " |  "bottom " |  "left "
data-align= "start " |  "center " |  "end "
role= "listbox "`}</pre>

                <div className='mt-4 space-y-2 text-xs'>
                  <h5 className='font-medium'>실제 CSS 값:</h5>
                  <div className='grid gap-1'>
                    <div><span className='font-mono text-blue-600'>bg-popover:</span> background-color: oklch(1 0 0) - 순수 흰색</div>
                    <div><span className='font-mono text-green-600'>text-popover-foreground:</span> color: oklch(0.129 0.042 264.695) - 진한 네이비</div>
                    <div><span className='font-mono text-purple-600'>min-w-[8rem]:</span> min-width: 128px</div>
                    <div><span className='font-mono text-orange-600'>z-50:</span> z-index: 50</div>
                    <div><span className='font-mono text-cyan-600'>rounded-md:</span> border-radius: 8px</div>
                    <div><span className='font-mono text-pink-600'>border:</span> 1px solid oklch(0.929 0.013 255.508)</div>
                    <div><span className='font-mono text-red-600'>shadow-md:</span> box-shadow: medium 크기</div>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-orange-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>SelectItem (선택 옵션)</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 핵심 클래스들
focus:bg-accent focus:text-accent-foreground 
[&_svg:not([class*='text-'])]:text-muted-foreground 
relative flex w-full cursor-default items-center gap-2 rounded-sm 
py-1.5 pr-8 pl-2 text-sm outline-hidden select-none 
data-[disabled]:pointer-events-none data-[disabled]:opacity-50 
[&_svg]:pointer-events-none [&_svg]:shrink-0 
[&_svg:not([class*='size-'])]:size-4

// 내부 체크 아이콘 스타일
*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2

// Radix가 자동 설정하는 속성들
data-slot="select-item"
data-state= "checked " |  "unchecked"
data-highlighted (키보드/마우스 호버 시)
data-disabled (비활성화 시)
role= "option "
aria-selected= "false " |  "true "`}</pre>

                <div className='mt-4 space-y-2 text-xs'>
                  <h5 className='font-medium'>실제 CSS 값:</h5>
                  <div className='grid gap-1'>
                    <div><span className='font-mono text-blue-600'>focus:bg-accent:</span> background-color: oklch(0.968 0.007 247.896) - 매우 연한 회색</div>
                    <div><span className='font-mono text-green-600'>focus:text-accent-foreground:</span> color: oklch(0.208 0.042 265.755) - 중간 네이비</div>
                    <div><span className='font-mono text-purple-600'>py-1.5:</span> padding-top/bottom: 6px</div>
                    <div><span className='font-mono text-orange-600'>pl-2:</span> padding-left: 8px</div>
                    <div><span className='font-mono text-cyan-600'>pr-8:</span> padding-right: 32px (체크 아이콘 공간)</div>
                    <div><span className='font-mono text-pink-600'>rounded-sm:</span> border-radius: 2px</div>
                    <div><span className='font-mono text-red-600'>text-sm:</span> font-size: 14px</div>
                    <div><span className='font-mono text-amber-600'>gap-2:</span> gap: 8px</div>
                  </div>

                  <div className='mt-4 p-3 bg-white rounded border'>
                    <h5 className='font-medium text-xs mb-2'>체크 아이콘 구조:</h5>
                    <pre className='text-xs'>{`// SelectItem 내부에 자동으로 추가되는 구조
<span className= "absolute right-2 flex size-3.5 items-center justify-center ">
  <SelectPrimitive.ItemIndicator>
    <CheckIcon className= "size-4 " />
  </SelectPrimitive.ItemIndicator>
</span>

// 실제 CSS 값
right-2: right: 8px
size-3.5: width/height: 14px (컨테이너)
size-4: width/height: 16px (아이콘)`}</pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. 실제 적용되는 CSS Values (프로젝트 커스텀)</CardTitle>
              <CardDescription>index.css에서 정의한 실제 색상값과 Tailwind v4 클래스</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <h4 className='font-medium mb-3'>CSS Variables (실제 프로젝트 값)</h4>
                  <div className='space-y-2 text-sm font-mono'>
                    <div className='text-blue-600 mb-2'>Light Mode (라이트 모드만):</div>
                    <div>--popover: <span className='text-gray-600'>oklch(1 0 0)</span></div>
                    <div>--popover-foreground: <span className='text-gray-600'>oklch(0.129 0.042 264.695)</span></div>
                    <div>--muted-foreground: <span className='text-gray-600'>oklch(0.554 0.046 257.417)</span></div>
                    <div>--accent: <span className='text-gray-600'>oklch(0.968 0.007 247.896)</span></div>
                    <div>--accent-foreground: <span className='text-gray-600'>oklch(0.208 0.042 265.755)</span></div>
                    <div>--border: <span className='text-gray-600'>oklch(0.929 0.013 255.508)</span></div>
                    <div>--input: <span className='text-gray-600'>oklch(0.929 0.013 255.508)</span></div>
                    <div>--ring: <span className='text-gray-600'>oklch(0.704 0.04 256.788)</span></div>
                    <div>--destructive: <span className='text-gray-600'>oklch(0.577 0.245 27.325)</span></div>
                  </div>
                </div>

                <div className='p-4 bg-muted/50 rounded-lg'>
                  <h4 className='font-medium mb-3'>Tailwind v4 애니메이션 클래스</h4>
                  <div className='space-y-2 text-sm font-mono'>
                    <div>animate-in: <span className='text-green-600'>animation-duration: 150ms; ease-out</span></div>
                    <div>animate-out: <span className='text-green-600'>animation-duration: 150ms; ease-in</span></div>
                    <div>fade-in-0: <span className='text-green-600'>@starting-style opacity: 0</span></div>
                    <div>fade-out-0: <span className='text-green-600'>opacity: 0</span></div>
                    <div>zoom-in-95: <span className='text-green-600'>@starting-style scale: 0.95</span></div>
                    <div>zoom-out-95: <span className='text-green-600'>scale: 0.95</span></div>
                    <div>slide-in-from-top-2: <span className='text-green-600'>@starting-style translateY(-0.5rem)</span></div>
                  </div>
                </div>

                <div className='p-4 bg-muted/50 rounded-lg md:col-span-2'>
                  <h4 className='font-medium mb-3'>Spacing & Sizing Values (Tailwind v4)</h4>
                  <div className='grid grid-cols-3 gap-4 text-sm font-mono'>
                    <div>
                      <div className='font-medium mb-2'>Trigger 크기:</div>
                      <div>h-9 (default): <span className='text-blue-600'>36px</span></div>
                      <div>h-8 (sm): <span className='text-blue-600'>32px</span></div>
                      <div>px-3: <span className='text-blue-600'>12px</span></div>
                      <div>py-2: <span className='text-blue-600'>8px</span></div>
                      <div>gap-2: <span className='text-blue-600'>8px</span></div>
                    </div>
                    <div>
                      <div className='font-medium mb-2'>Content 크기:</div>
                      <div>min-w-[8rem]: <span className='text-purple-600'>128px</span></div>
                      <div>z-50: <span className='text-purple-600'>z-index: 50</span></div>
                      <div>rounded-md: <span className='text-purple-600'>8px</span></div>
                      <div>shadow-md: <span className='text-purple-600'>medium shadow</span></div>
                    </div>
                    <div>
                      <div className='font-medium mb-2'>Item 크기:</div>
                      <div>py-1.5: <span className='text-orange-600'>6px</span></div>
                      <div>pl-2: <span className='text-orange-600'>8px</span></div>
                      <div>pr-8: <span className='text-orange-600'>32px</span></div>
                      <div>rounded-sm: <span className='text-orange-600'>2px</span></div>
                      <div>text-sm: <span className='text-orange-600'>14px</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-indigo-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-3'>🎨 프로젝트 특징: OKLCH 색상 공간 사용</h4>
                <div className='text-xs space-y-2'>
                  <div>• <strong>OKLCH:</strong> 인간의 시각에 더 가까운 색상 표현</div>
                  <div>• <strong>더 정확한 명도:</strong> L(명도), C(채도), H(색조)로 구성</div>
                  <div>• <strong>색상 보간:</strong> 애니메이션 시 더 자연스러운 색상 변화</div>
                  <div>• <strong>접근성:</strong> 명도 기반으로 대비 계산이 더 정확</div>
                  <div>• <strong>커스텀 Radius:</strong> --radius: 0.625rem (10px) 프로젝트 고유 설정</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>5. 추가 컴포넌트들 (SelectLabel, SelectSeparator, SelectGroup)</CardTitle>
              <CardDescription>그룹화 및 구분을 위한 보조 컴포넌트들</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                <div className='p-4 bg-cyan-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-2'>SelectLabel (그룹 라벨)</h4>
                  <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 클래스들
text-muted-foreground px-2 py-1.5 text-xs

// Radix가 자동 설정하는 속성들
data-slot="select-label"
role="group"`}</pre>
                  <div className='space-y-1 text-xs'>
                    <div><span className='font-mono text-blue-600'>text-muted-foreground:</span> oklch(0.554 0.046 257.417)</div>
                    <div><span className='font-mono text-green-600'>px-2:</span> padding 좌우 8px</div>
                    <div><span className='font-mono text-purple-600'>py-1.5:</span> padding 상하 6px</div>
                    <div><span className='font-mono text-orange-600'>text-xs:</span> font-size 12px</div>
                  </div>
                </div>

                <div className='p-4 bg-red-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-2'>SelectSeparator (구분선)</h4>
                  <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 클래스들
bg-border pointer-events-none -mx-1 my-1 h-px

// Radix가 자동 설정하는 속성들
data-slot="select-separator"
role="separator"`}</pre>
                  <div className='space-y-1 text-xs'>
                    <div><span className='font-mono text-blue-600'>bg-border:</span> oklch(0.929 0.013 255.508)</div>
                    <div><span className='font-mono text-green-600'>h-px:</span> height 1px</div>
                    <div><span className='font-mono text-purple-600'>my-1:</span> margin 상하 4px</div>
                    <div><span className='font-mono text-orange-600'>-mx-1:</span> margin 좌우 -4px</div>
                    <div><span className='font-mono text-cyan-600'>pointer-events-none:</span> 클릭 불가</div>
                  </div>
                </div>

                <div className='p-4 bg-yellow-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-2'>SelectGroup (그룹 컨테이너)</h4>
                  <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 클래스들
(기본 스타일 없음)

// Radix가 자동 설정하는 속성들
data-slot="select-group"
role="group"`}</pre>
                  <div className='space-y-1 text-xs'>
                    <div><span className='font-mono text-blue-600'>기능:</span> SelectLabel과 SelectItem들을 논리적으로 그룹화</div>
                    <div><span className='font-mono text-green-600'>접근성:</span> 스크린 리더가 그룹을 인식</div>
                    <div><span className='font-mono text-purple-600'>스타일:</span> CSS 클래스 없음, 구조적 역할만</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>6. Props와 Positioning 옵션</CardTitle>
              <CardDescription>실제 사용 가능한 모든 Props와 기본값</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-4 bg-cyan-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>SelectTrigger Props</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>사이즈:</strong></div>
                    <div className='ml-4'>• <code>size</code>: "sm" | "default" (기본: "default")</div>
                    <div className='ml-4'>• default: 36px 높이 (h-9)</div>
                    <div className='ml-4'>• sm: 32px 높이 (h-8)</div>
                    <div className='mt-3'><strong>스타일링:</strong></div>
                    <div className='ml-4'>• <code>className</code>: string</div>
                    <div className='ml-4'>• <code>children</code>: ReactNode (SelectValue + 다른 요소들)</div>
                    <div className='mt-3'><strong>접근성:</strong></div>
                    <div className='ml-4'>• aria-invalid 상태에 따른 에러 스타일 자동 적용</div>
                    <div className='ml-4'>• disabled 상태 지원</div>
                  </div>
                </div>

                <div className='p-4 bg-rose-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>SelectContent Props</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>포지셔닝:</strong></div>
                    <div className='ml-4'>• <code>position</code>: "item-aligned" | "popper" (기본: "popper")</div>
                    <div className='ml-4'>• <code>side</code>: "top" | "right" | "bottom" | "left"</div>
                    <div className='ml-4'>• <code>align</code>: "start" | "center" | "end"</div>
                    <div className='ml-4'>• <code>sideOffset</code>: number</div>
                    <div className='ml-4'>• <code>alignOffset</code>: number</div>
                    <div className='mt-3'><strong>스타일링:</strong></div>
                    <div className='ml-4'>• <code>className</code>: string</div>
                    <div className='ml-4'>• <code>children</code>: ReactNode</div>
                  </div>
                </div>

                <div className='p-4 bg-purple-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>Select Root Props</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>상태 관리:</strong></div>
                    <div className='ml-4'>• <code>value</code>: string (controlled)</div>
                    <div className='ml-4'>• <code>defaultValue</code>: string (uncontrolled)</div>
                    <div className='ml-4'>• <code>onValueChange</code>: (value: string) =&gt; void</div>
                    <div className='mt-3'><strong>기타 옵션:</strong></div>
                    <div className='ml-4'>• <code>disabled</code>: boolean</div>
                    <div className='ml-4'>• <code>required</code>: boolean</div>
                    <div className='ml-4'>• <code>name</code>: string (form 전송용)</div>
                  </div>
                </div>

                <div className='p-4 bg-amber-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>SelectItem Props</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>필수 Props:</strong></div>
                    <div className='ml-4'>• <code>value</code>: string (고유 식별자)</div>
                    <div className='ml-4'>• <code>children</code>: ReactNode (표시될 내용)</div>
                    <div className='mt-3'><strong>선택적 Props:</strong></div>
                    <div className='ml-4'>• <code>disabled</code>: boolean</div>
                    <div className='ml-4'>• <code>textValue</code>: string (검색/필터용)</div>
                    <div className='ml-4'>• <code>className</code>: string</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>7. 애니메이션 및 인터랙션</CardTitle>
              <CardDescription>실제 적용되는 애니메이션과 사용자 인터랙션</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='p-4 bg-green-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>드롭다운 열기/닫기 애니메이션</h4>
                  <div className='space-y-2 text-xs font-mono'>
                    <div className='text-green-600 mb-2'>열기 (data-state="open"):</div>
                    <div>animate-in: 150ms ease-out</div>
                    <div>fade-in-0: opacity 0 → 1</div>
                    <div>zoom-in-95: scale 0.95 → 1</div>
                    <div>slide-in-from-*-2: 방향별 8px 이동</div>
                    <div className='text-red-600 mb-2 mt-4'>닫기 (data-state="closed"):</div>
                    <div>animate-out: 150ms ease-in</div>
                    <div>fade-out-0: opacity 1 → 0</div>
                    <div>zoom-out-95: scale 1 → 0.95</div>
                  </div>
                </div>

                <div className='p-4 bg-blue-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>키보드 인터랙션</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>SelectTrigger 포커스 시:</strong></div>
                    <div className='ml-4'>• Space/Enter: 드롭다운 열기</div>
                    <div className='ml-4'>• Arrow Down/Up: 드롭다운 열고 첫/마지막 아이템으로</div>
                    <div className='mt-3'><strong>SelectContent 열림 시:</strong></div>
                    <div className='ml-4'>• Arrow Down/Up: 아이템 간 이동</div>
                    <div className='ml-4'>• Enter/Space: 아이템 선택</div>
                    <div className='ml-4'>• Escape: 드롭다운 닫기</div>
                    <div className='ml-4'>• Tab: 포커스를 다음 요소로</div>
                    <div className='ml-4'>• 문자 입력: 해당 문자로 시작하는 아이템으로 이동</div>
                  </div>
                </div>

                <div className='p-4 bg-purple-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>마우스 인터랙션</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>SelectTrigger:</strong></div>
                    <div className='ml-4'>• Click: 드롭다운 토글</div>
                    <div className='ml-4'>• Focus: 포커스 링 표시</div>
                    <div className='mt-3'><strong>SelectItem:</strong></div>
                    <div className='ml-4'>• Hover: 배경색 변경 (data-highlighted)</div>
                    <div className='ml-4'>• Click: 아이템 선택 후 드롭다운 닫기</div>
                    <div className='mt-3'><strong>외부 영역:</strong></div>
                    <div className='ml-4'>• Click Outside: 드롭다운 닫기</div>
                  </div>
                </div>

                <div className='p-4 bg-orange-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>상태별 시각적 피드백</h4>
                  <div className='space-y-2 text-xs'>
                    <div><strong>SelectTrigger 상태:</strong></div>
                    <div className='ml-4'>• 기본: border-input 색상</div>
                    <div className='ml-4'>• 포커스: ring-ring/50, border-ring</div>
                    <div className='ml-4'>• 에러: border-destructive, ring-destructive/20</div>
                    <div className='ml-4'>• 비활성: opacity-50</div>
                    <div className='mt-3'><strong>SelectItem 상태:</strong></div>
                    <div className='ml-4'>• 기본: 투명 배경</div>
                    <div className='ml-4'>• 호버: bg-accent, text-accent-foreground</div>
                    <div className='ml-4'>• 선택: 우측 체크 아이콘 표시</div>
                    <div className='ml-4'>• 비활성: opacity-50, pointer-events-none</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                8. 실사용 코드 예시
                <Badge variant='outline'>Copy & Paste</Badge>
              </CardTitle>
              <CardDescription>
                실제 프로젝트에서 바로 사용할 수 있는 완성된 코드 예시들
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3 flex items-center gap-2'>
                    🎯 기본 사용법
                    <Badge variant='secondary' className='text-xs'>필수</Badge>
                  </h4>
                  <div className='space-y-3'>
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="옵션을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">옵션 1</SelectItem>
                        <SelectItem value="option2">옵션 2</SelectItem>
                        <SelectItem value="option3">옵션 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>코드 보기</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="옵션을 선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">옵션 1</SelectItem>
    <SelectItem value="option2">옵션 2</SelectItem>
    <SelectItem value="option3">옵션 3</SelectItem>
  </SelectContent>
</Select>`}</pre>
                    </details>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🎛️ 상태 관리 (Controlled)</h4>
                  <div className='space-y-3'>
                    <Select value={selectedValue} onValueChange={setSelectedValue}>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="과일을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="apple">🍎 사과</SelectItem>
                        <SelectItem value="banana">🍌 바나나</SelectItem>
                        <SelectItem value="orange">🍊 오렌지</SelectItem>
                      </SelectContent>
                    </Select>
                    {selectedValue && (
                      <p className='text-sm'>선택된 값: <span className='font-mono bg-muted px-1 rounded text-xs'>{selectedValue}</span></p>
                    )}
                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>코드 보기</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`const [selectedValue, setSelectedValue] = useState<string>('')

<Select value={selectedValue} onValueChange={setSelectedValue}>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="과일을 선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="apple">🍎 사과</SelectItem>
    <SelectItem value="banana">🍌 바나나</SelectItem>
    <SelectItem value="orange">🍊 오렌지</SelectItem>
  </SelectContent>
</Select>`}</pre>
                    </details>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>📂 그룹화된 옵션</h4>
                  <div className='space-y-3'>
                    <Select>
                      <SelectTrigger className="w-[220px]">
                        <SelectValue placeholder="음식을 선택하세요" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>과일</SelectLabel>
                          <SelectItem value="apple">사과</SelectItem>
                          <SelectItem value="banana">바나나</SelectItem>
                          <SelectItem value="orange">오렌지</SelectItem>
                        </SelectGroup>
                        <SelectSeparator />
                        <SelectGroup>
                          <SelectLabel>채소</SelectLabel>
                          <SelectItem value="carrot">당근</SelectItem>
                          <SelectItem value="lettuce">상추</SelectItem>
                          <SelectItem value="tomato">토마토</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>코드 보기</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`<Select>
  <SelectTrigger className="w-[220px]">
    <SelectValue placeholder="음식을 선택하세요" />
  </SelectTrigger>
  <SelectContent>
    <SelectGroup>
      <SelectLabel>과일</SelectLabel>
      <SelectItem value="apple">사과</SelectItem>
      <SelectItem value="banana">바나나</SelectItem>
      <SelectItem value="orange">오렌지</SelectItem>
    </SelectGroup>
    <SelectSeparator />
    <SelectGroup>
      <SelectLabel>채소</SelectLabel>
      <SelectItem value="carrot">당근</SelectItem>
      <SelectItem value="lettuce">상추</SelectItem>
      <SelectItem value="tomato">토마토</SelectItem>
    </SelectGroup>
  </SelectContent>
</Select>`}</pre>
                    </details>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚙️ 사이즈 변형</h4>
                  <div className='space-y-3'>
                    <div className='space-y-2'>
                      <label className='text-xs text-muted-foreground'>작은 사이즈 (h-8)</label>
                      <Select>
                        <SelectTrigger size="sm" className="w-[180px]">
                          <SelectValue placeholder="작은 크기" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small1">작은 옵션 1</SelectItem>
                          <SelectItem value="small2">작은 옵션 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-xs text-muted-foreground'>기본 사이즈 (h-9)</label>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="기본 크기" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal1">기본 옵션 1</SelectItem>
                          <SelectItem value="normal2">기본 옵션 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🚫 비활성화 옵션</h4>
                  <div className='space-y-3'>
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="권한 선택" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="read">읽기 권한</SelectItem>
                        <SelectItem value="write">쓰기 권한</SelectItem>
                        <SelectItem value="admin" disabled>관리자 권한 (비활성)</SelectItem>
                      </SelectContent>
                    </Select>
                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>코드 보기</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`<Select>
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="권한 선택" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="read">읽기 권한</SelectItem>
    <SelectItem value="write">쓰기 권한</SelectItem>
    <SelectItem value="admin" disabled>관리자 권한 (비활성)</SelectItem>
  </SelectContent>
</Select>`}</pre>
                    </details>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚡ 기본값 설정</h4>
                  <div className='space-y-3'>
                    <Select defaultValue="option2">
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="기본값 있음" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">옵션 1</SelectItem>
                        <SelectItem value="option2">옵션 2 (기본선택)</SelectItem>
                        <SelectItem value="option3">옵션 3</SelectItem>
                      </SelectContent>
                    </Select>
                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>코드 보기</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`<Select defaultValue="option2">
  <SelectTrigger className="w-[200px]">
    <SelectValue placeholder="기본값 있음" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">옵션 1</SelectItem>
    <SelectItem value="option2">옵션 2 (기본선택)</SelectItem>
    <SelectItem value="option3">옵션 3</SelectItem>
  </SelectContent>
</Select>`}</pre>
                    </details>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                9. 피그마 디자인 시스템 가이드
                <Badge variant='outline'>Design Tokens</Badge>
              </CardTitle>
              <CardDescription>
                피그마에서 Select 컴포넌트를 정확히 구현하기 위한 상세 가이드
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-6'>
                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🎨 Master Components 구조</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>1. SelectTrigger 변형들</h5>
                      <div className='space-y-3'>
                        <div className='space-y-2'>
                          <span className='text-xs text-muted-foreground'>Default (36px 높이)</span>
                          <div className='flex items-center gap-2'>
                            <Select>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="기본 사이즈" />
                              </SelectTrigger>
                            </Select>
                            <span className='text-xs font-mono text-blue-600'>h-9</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <span className='text-xs text-muted-foreground'>Small (32px 높이)</span>
                          <div className='flex items-center gap-2'>
                            <Select>
                              <SelectTrigger size="sm" className="w-[200px]">
                                <SelectValue placeholder="작은 사이즈" />
                              </SelectTrigger>
                            </Select>
                            <span className='text-xs font-mono text-blue-600'>h-8</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <span className='text-xs text-muted-foreground'>Focus 상태</span>
                          <Select>
                            <SelectTrigger className="w-[200px] border-ring ring-ring/50 ring-[3px]">
                              <SelectValue placeholder="포커스 상태" />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div className='space-y-2'>
                          <span className='text-xs text-muted-foreground'>Error 상태</span>
                          <Select>
                            <SelectTrigger className="w-[200px] border-destructive ring-destructive/20 ring-[3px]">
                              <SelectValue placeholder="에러 상태" />
                            </SelectTrigger>
                          </Select>
                        </div>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <h5 className='font-medium text-xs mb-3'>정확한 수치</h5>
                      <div className='text-xs space-y-2 font-mono'>
                        <div>• <strong>기본 높이:</strong> 36px (h-9)</div>
                        <div>• <strong>작은 높이:</strong> 32px (h-8)</div>
                        <div>• <strong>최소 너비:</strong> 128px</div>
                        <div>• <strong>패딩:</strong> 8px 12px (py-2 px-3)</div>
                        <div>• <strong>내부 간격:</strong> 8px (gap-2)</div>
                        <div>• <strong>테두리:</strong> 1px solid</div>
                        <div>• <strong>둥근 모서리:</strong> 8px (rounded-md)</div>
                        <div>• <strong>포커스 링:</strong> 3px 두께</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🎯 정확한 색상값 (디자인 토큰)</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>기본 색상</h5>
                      <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 bg-white border rounded flex-shrink-0'></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Background</div>
                            <div className='font-mono text-muted-foreground'>#FFFFFF</div>
                            <div className='font-mono text-muted-foreground'>oklch(1 0 0)</div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 border rounded flex-shrink-0' style={{backgroundColor: 'oklch(0.929 0.013 255.508)'}}></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Border</div>
                            <div className='font-mono text-muted-foreground'>#E2E8F0</div>
                            <div className='font-mono text-muted-foreground'>oklch(0.929 0.013 255.508)</div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded flex-shrink-0' style={{backgroundColor: 'oklch(0.554 0.046 257.417)'}}></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Text Muted</div>
                            <div className='font-mono text-muted-foreground'>#64748B</div>
                            <div className='font-mono text-muted-foreground'>oklch(0.554 0.046 257.417)</div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded flex-shrink-0' style={{backgroundColor: 'oklch(0.129 0.042 264.695)'}}></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Text Default</div>
                            <div className='font-mono text-muted-foreground'>#0F172A</div>
                            <div className='font-mono text-muted-foreground'>oklch(0.129 0.042 264.695)</div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>상태별 색상</h5>
                      <div className='space-y-3'>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded flex-shrink-0' style={{backgroundColor: 'oklch(0.704 0.04 256.788)'}}></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Focus Ring</div>
                            <div className='font-mono text-muted-foreground'>#3B82F6</div>
                            <div className='font-mono text-muted-foreground'>oklch(0.704 0.04 256.788)</div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded flex-shrink-0' style={{backgroundColor: 'oklch(0.968 0.007 247.896)'}}></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Hover Background</div>
                            <div className='font-mono text-muted-foreground'>#F1F5F9</div>
                            <div className='font-mono text-muted-foreground'>oklch(0.968 0.007 247.896)</div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 rounded flex-shrink-0' style={{backgroundColor: 'oklch(0.577 0.245 27.325)'}}></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Error</div>
                            <div className='font-mono text-muted-foreground'>#EF4444</div>
                            <div className='font-mono text-muted-foreground'>oklch(0.577 0.245 27.325)</div>
                          </div>
                        </div>
                        <div className='flex items-center gap-3'>
                          <div className='w-8 h-8 bg-gray-300 rounded flex-shrink-0 opacity-50'></div>
                          <div className='text-xs'>
                            <div className='font-medium'>Disabled</div>
                            <div className='font-mono text-muted-foreground'>50% opacity</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>📐 SelectContent & SelectItem 구조</h4>
                  <div className='grid grid-cols-1 gap-6'>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectContent (드롭다운)</h5>
                      <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='border rounded-md bg-white shadow-md p-1 w-[200px] flex-shrink-0'>
                          <div className='px-2 py-1.5 text-xs text-muted-foreground'>과일</div>
                          <div className='px-2 py-1.5 text-sm rounded-sm hover:bg-accent cursor-pointer'>사과</div>
                          <div className='px-2 py-1.5 text-sm rounded-sm bg-accent'>바나나 ✓</div>
                          <div className='h-px bg-border my-1 -mx-1'></div>
                          <div className='px-2 py-1.5 text-xs text-muted-foreground'>채소</div>
                          <div className='px-2 py-1.5 text-sm rounded-sm hover:bg-accent cursor-pointer'>당근</div>
                        </div>
                        <div className='text-xs font-mono space-y-1 flex-shrink-0'>
                          <div className='text-purple-600'>min-w: 128px</div>
                          <div className='text-orange-600'>padding: 4px</div>
                          <div className='text-cyan-600'>radius: 8px</div>
                          <div className='text-red-600'>shadow: md</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectItem 상세 구조</h5>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='text-xs space-y-2 font-mono'>
                          <div>• <strong>높이:</strong> 32px (고정)</div>
                          <div>• <strong>패딩:</strong> 6px 32px 6px 8px</div>
                          <div>• <strong>텍스트:</strong> 14px (text-sm)</div>
                          <div>• <strong>둥근 모서리:</strong> 2px (rounded-sm)</div>
                          <div>• <strong>체크 아이콘:</strong> 16px, 우측 8px</div>
                        </div>
                        <div className='space-y-3'>
                          <div className='space-y-2'>
                            <div className='text-xs text-muted-foreground'>기본 상태</div>
                            <div className='px-2 py-1.5 text-sm border rounded-sm'>일반 아이템</div>
                          </div>
                          <div className='space-y-2'>
                            <div className='text-xs text-muted-foreground'>호버 상태</div>
                            <div className='px-2 py-1.5 text-sm border rounded-sm bg-accent'>호버된 아이템</div>
                          </div>
                          <div className='space-y-2'>
                            <div className='text-xs text-muted-foreground'>선택 상태</div>
                            <div className='px-2 py-1.5 text-sm border rounded-sm bg-accent relative pr-8'>
                              선택된 아이템
                              <span className='absolute right-2 top-1/2 -translate-y-1/2'>✓</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🔧 Auto Layout 설정 (피그마)</h4>
                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                    <div className='space-y-3'>
                      <h5 className='font-medium text-xs'>SelectTrigger</h5>
                      <div className='text-xs space-y-1'>
                        <div>• <strong>Direction:</strong> Horizontal</div>
                        <div>• <strong>Spacing:</strong> 8px</div>
                        <div>• <strong>Padding:</strong> 8px 12px</div>
                        <div>• <strong>Alignment:</strong> Space between</div>
                        <div>• <strong>Sizing:</strong> Fixed width</div>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <h5 className='font-medium text-xs'>SelectContent</h5>
                      <div className='text-xs space-y-1'>
                        <div>• <strong>Direction:</strong> Vertical</div>
                        <div>• <strong>Spacing:</strong> 0px</div>
                        <div>• <strong>Padding:</strong> 4px</div>
                        <div>• <strong>Max Height:</strong> 256px</div>
                        <div>• <strong>Overflow:</strong> Scroll</div>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <h5 className='font-medium text-xs'>SelectItem</h5>
                      <div className='text-xs space-y-1'>
                        <div>• <strong>Direction:</strong> Horizontal</div>
                        <div>• <strong>Height:</strong> 32px (Fixed)</div>
                        <div>• <strong>Padding:</strong> 6px 8px</div>
                        <div>• <strong>Alignment:</strong> Left</div>
                        <div>• <strong>Icon Space:</strong> 32px (right)</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚙️ Component Properties 설정</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectTrigger Properties</h5>
                      <div className='space-y-3'>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>Size (Variant)</div>
                          <div>• Default (36px)</div>
                          <div>• Small (32px)</div>
                        </div>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>State (Boolean)</div>
                          <div>• Focus</div>
                          <div>• Error</div>
                          <div>• Disabled</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectItem Properties</h5>
                      <div className='space-y-3'>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>State (Variant)</div>
                          <div>• Default</div>
                          <div>• Hover</div>
                          <div>• Selected</div>
                          <div>• Disabled</div>
                        </div>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>Content</div>
                          <div>• Text (Instance Swap)</div>
                          <div>• Icon (Optional)</div>
                          <div>• Check Icon (Selected)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 bg-slate-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>📋 체크리스트 - 피그마 구현 완료 확인</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-xs'>
                    <div className='space-y-2'>
                      <h5 className='font-medium'>컴포넌트 구조</h5>
                      <div className='space-y-1'>
                        <div>□ SelectTrigger 기본/작은 사이즈 variant 생성</div>
                        <div>□ SelectContent 드롭다운 패널 생성</div>
                        <div>□ SelectItem 4가지 상태 구현</div>
                        <div>□ SelectLabel, SelectSeparator 보조 컴포넌트</div>
                        <div>□ 체크 아이콘 위치 및 크기 정확히 설정</div>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <h5 className='font-medium'>스타일 적용</h5>
                      <div className='space-y-1'>
                        <div>□ 정확한 색상값 (OKLCH → HEX) 적용</div>
                        <div>□ Auto Layout 설정 완료</div>
                        <div>□ Component Properties 설정</div>
                        <div>□ Design Tokens 연결</div>
                        <div>□ 반응형 크기 조정 (min-width 등)</div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 p-3 bg-white rounded border text-xs'>
                    <strong>⚠️ 중요 주의사항:</strong>
                    <div className='mt-2 space-y-1'>
                      <div>• SelectTrigger는 반드시 고정 너비 또는 최소 너비 설정</div>
                      <div>• SelectContent는 SelectTrigger보다 작아지면 안 됨</div>
                      <div>• 모든 상태는 실제 CSS와 정확히 일치해야 함</div>
                      <div>• 체크 아이콘은 선택된 상태에서만 표시</div>
                    </div>
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