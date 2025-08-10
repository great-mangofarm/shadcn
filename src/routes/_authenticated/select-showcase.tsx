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
  SelectGroup,
} from '@/components/ui/select'
import { ChevronDownIcon, ChevronUpIcon, CheckIcon } from 'lucide-react'
import React, { useState } from 'react'
import { IconLoader } from '@tabler/icons-react'

export const Route = createFileRoute('/_authenticated/select-showcase')({
  component: SelectShowcase,
})



// 기존 SelectContentPreview 이름으로 유지
function SelectContentPreview({
                                options,
                                groupOption = false,
                                labelA = "그룹 1",
                                labelB = "그룹 2",
                                defaultValue,
                                onChange,
                              }: {
  options?: { value: string; label: React.ReactNode; disabled?: boolean }[]
  groupOption?: boolean
  labelA?: React.ReactNode
  labelB?: React.ReactNode
  defaultValue?: string
  onChange?: (value: string) => void
}) {
  const fallback = [
    { value: "opt-1", label: "옵션 1" },
    { value: "opt-2", label: "옵션 2" },
    { value: "opt-3", label: "옵션 3" },
    { value: "opt-4", label: "옵션 4" },
    { value: "opt-5", label: "옵션 5" },
    { value: "opt-6", label: "옵션 6" },
    { value: "opt-7", label: "옵션 7" },
    { value: "opt-8", label: "옵션 8" },
  ]
  const list = (options?.length ? options : fallback).slice()
  const [value, setValue] = React.useState<string>(defaultValue ?? list[0]?.value ?? "")

  const Item = (o: { value: string; label: React.ReactNode; disabled?: boolean }) => {
    const checked = value === o.value

    const handleClick = () => {
      if (o.disabled) return
      setValue(o.value)
      onChange?.(o.value)
    }
    const handleKeyDown: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
      if (o.disabled) return
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        handleClick()
      }
    }
    // hover 시 원본처럼 data-highlighted 속성으로 스타일 적용
    const handleEnter: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.currentTarget.setAttribute("data-highlighted", "")
    }
    const handleLeave: React.MouseEventHandler<HTMLDivElement> = (e) => {
      e.currentTarget.removeAttribute("data-highlighted")
    }

    return (
      <div
        role="option"
        aria-selected={checked}
        tabIndex={o.disabled ? -1 : 0}
        data-slot="select-item"
        data-state={checked ? "checked" : "unchecked"}
        {...(o.disabled ? { "data-disabled": "" } : {})}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        className="
          relative flex w-full cursor-default select-none items-center gap-2 rounded-sm
          py-1.5 pl-2 pr-8 text-sm outline-hidden
          data-[disabled]:pointer-events-none data-[disabled]:opacity-50
          focus:bg-accent focus:text-accent-foreground
          data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground
          [&_svg]:pointer-events-none [&_svg]:shrink-0
          [&_svg:not([class*='size-'])]:size-4
        "
      >
        <span className="flex items-center gap-2">{o.label}</span>

        {checked && (
          <span className="absolute right-2 flex size-3.5 items-center justify-center">
            <CheckIcon className="size-4" aria-hidden="true" />
          </span>
        )}
      </div>
    )
  }

  const Groups = () => {
    const mid = Math.ceil(list.length / 2)
    const A = list.slice(0, mid)
    const B = list.slice(mid)
    return (
      <>
        <div data-slot="select-group" role="group">
          <div data-slot="select-label" className="text-muted-foreground px-2 py-1.5 text-xs">
            {labelA}
          </div>
          {A.map((o) => <Item key={o.value} {...o} />)}
        </div>

        <div data-slot="select-separator" role="separator" className="bg-border pointer-events-none -mx-1 my-1 h-px" />

        <div data-slot="select-group" role="group">
          <div data-slot="select-label" className="text-muted-foreground px-2 py-1.5 text-xs">
            {labelB}
          </div>
          {B.map((o) => <Item key={o.value} {...o} />)}
        </div>
      </>
    )
  }

  return (
    <div
      role="listbox"
      data-slot="select-content"
      data-state="open"
      data-side="bottom"
      data-align="start"
      className="
        bg-popover text-popover-foreground
        data-[state=open]:animate-in data-[state=closed]:animate-out
        data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0
        data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95
        data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2
        data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2
        relative z-50 max-h-[var(--radix-select-content-available-height)]
        min-w-[8rem] origin-[var(--radix-select-content-transform-origin)]
        overflow-x-hidden overflow-y-auto rounded-md border shadow-md
      "
      // ✅ 넓이: 내용 기반(긴 아이템 기준) + 최소 8rem, 블록 100% 방지
      style={
        {
          display: "inline-block",
          width: "max-content",
          minWidth: "8rem",
          ["--radix-select-content-available-height" as any]: "9999px",
          ["--radix-select-content-transform-origin" as any]: "center",
        } as React.CSSProperties
      }
    >
      {/* Scroll Up */}
      <div data-slot="select-scroll-up-button" aria-hidden="true" className="flex cursor-default items-center justify-center py-1">
        <ChevronUpIcon className="size-4" aria-hidden="true" />
      </div>

      {/* Viewport */}
      <div className="p-1">
        {groupOption ? <Groups /> : list.map((o) => <Item key={o.value} {...o} />)}
      </div>

      {/* Scroll Down */}
      <div data-slot="select-scroll-down-button" aria-hidden="true" className="flex cursor-default items-center justify-center py-1">
        <ChevronDownIcon className="size-4" aria-hidden="true" />
      </div>
    </div>
  )
}



function SelectLoadingRow() {
  return (
    <div
      className="
        relative flex w-full items-center gap-2 rounded-sm
        py-1.5 pr-8 pl-2 text-sm select-none
        pointer-events-none opacity-50 h-14
        [&_svg]:pointer-events-none [&_svg]:shrink-0
        [&_svg:not([class*='size-'])]:size-4
      "
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center" />
      <div className="flex w-full items-center justify-center gap-2">
        <IconLoader className="h-5 w-5 animate-spin" />
        {"  "}
        Loading...
      </div>
    </div>
  )
}


function SelectShowcase() {
  const [selectedValue, setSelectedValue] = useState<string>('')
  const [loadingValue, setLoadingValue] = useState<string>('')
  const [renderValue, setRenderValue] = useState<string>('')

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
              Select 컴포넌트의 완전한 구조, CSS 클래스, 실제 사용 예시 분석 (Tailwind CSS v4.1.11 + Radix UI v2.2.5)
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                1. 완전한 Select 구조 분석
                <Badge variant='secondary'>shadcn/ui + Radix UI v2.2.5</Badge>
              </CardTitle>
              <CardDescription>
                SelectScrollButton을 포함한 모든 서브 컴포넌트와 실제 적용되는 CSS 클래스 분석
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1.1 전체 컴포넌트 구조 시각화 (스크롤 포함)</h3>
                <div className='p-6 bg-muted/30 rounded-lg border'>
                  <div className='text-sm text-muted-foreground mb-4'>
                    ⚠️ SelectContent는 실제로는 Portal로 body에 렌더링되지만, 여기서는 시각화를 위해 인라인으로 표시
                    <br />
                    📏 긴 목록에서는 SelectScrollUpButton/SelectScrollDownButton이 자동으로 나타남
                  </div>

                  <div className='flex flex-col gap-4'>
                    <Select value={selectedValue} onValueChange={setSelectedValue}>
                      <SelectTrigger className='w-[220px] bg-blue-50 border-2 border-blue-300 border-dashed relative'>
                        <div className='absolute -top-8 left-0 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap'>
                          SelectTrigger
                        </div>
                        <div className='bg-green-100 px-2 py-1 rounded border border-green-300 relative'>
                          <div className='absolute -top-6 left-0 bg-green-600 text-white px-1 rounded text-xs font-bold'>
                            SelectValue
                          </div>
                          <SelectValue placeholder="과일을 선택하세요" />
                        </div>
                        <div className='bg-purple-100 p-1 rounded border border-purple-300 relative ml-2'>
                          <div className='absolute -top-6 left-0 bg-purple-600 text-white px-1 rounded text-xs font-bold'>
                            Icon
                          </div>
                          <ChevronDownIcon className='h-4 w-4' />
                        </div>
                      </SelectTrigger>
                      <SelectContent className='bg-orange-50 border-2 border-orange-300 border-dashed relative max-h-[200px]'>
                        <div className='absolute -top-8 left-0 bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold whitespace-nowrap'>
                          SelectContent (max-height: 200px)
                        </div>

                        {/* SelectScrollUpButton */}
                        <div className='bg-indigo-100 border border-indigo-300 border-dashed relative py-1 flex justify-center'>
                          <div className='absolute -top-6 left-0 bg-indigo-600 text-white px-1 rounded text-xs font-bold'>
                            SelectScrollUpButton
                          </div>
                          <ChevronUpIcon className='h-4 w-4' />
                        </div>

                        <SelectGroup>
                          <SelectLabel className='bg-cyan-100 px-2 py-1.5 rounded border border-cyan-300 relative'>
                            <div className='absolute -top-6 left-0 bg-cyan-600 text-white px-1 rounded text-xs font-bold'>
                              SelectLabel
                            </div>
                            과일류
                          </SelectLabel>
                          <SelectItem value="apple" className='bg-pink-100 border border-pink-300 border-dashed relative'>
                            <div className='absolute -top-6 left-0 bg-pink-600 text-white px-1 rounded text-xs font-bold'>
                              SelectItem
                            </div>
                            🍎 사과
                          </SelectItem>
                          <SelectItem value="banana" className='bg-pink-100 border border-pink-300 border-dashed relative'>
                            바나나 🍌
                          </SelectItem>
                          <SelectItem value="orange" className='bg-pink-100 border border-pink-300 border-dashed relative'>
                            오렌지 🍊
                          </SelectItem>
                          <SelectItem value="grape" className='bg-pink-100 border border-pink-300 border-dashed relative'>
                            포도 🍇
                          </SelectItem>
                        </SelectGroup>

                        <SelectSeparator className='bg-red-100 border border-red-300 border-dashed relative my-2'>
                          <div className='absolute -top-6 left-0 bg-red-600 text-white px-1 rounded text-xs font-bold'>
                            SelectSeparator
                          </div>
                        </SelectSeparator>

                        <SelectGroup>
                          <SelectLabel className='bg-cyan-100 px-2 py-1.5 rounded border border-cyan-300'>채소류</SelectLabel>
                          <SelectItem value="carrot" className='bg-pink-100 border border-pink-300 border-dashed'>🥕 당근</SelectItem>
                          <SelectItem value="lettuce" className='bg-pink-100 border border-pink-300 border-dashed'>🥬 상추</SelectItem>
                          <SelectItem value="tomato" className='bg-pink-100 border border-pink-300 border-dashed'>🍅 토마토</SelectItem>
                          <SelectItem value="cucumber" className='bg-pink-100 border border-pink-300 border-dashed'>🥒 오이</SelectItem>
                          <SelectItem value="broccoli" className='bg-pink-100 border border-pink-300 border-dashed'>🥦 브로콜리</SelectItem>
                        </SelectGroup>

                        {/* SelectScrollDownButton */}
                        <div className='bg-indigo-100 border border-indigo-300 border-dashed relative py-1 flex justify-center'>
                          <div className='absolute -top-6 left-0 bg-indigo-600 text-white px-1 rounded text-xs font-bold'>
                            SelectScrollDownButton
                          </div>
                          <ChevronDownIcon className='h-4 w-4' />
                        </div>
                      </SelectContent>
                    </Select>

                    <div className='text-sm text-muted-foreground'>
                      👆 SelectTrigger를 클릭하면 SelectContent가 나타납니다. 선택된 값: <span className='font-mono bg-gray-100 px-1 rounded'>{selectedValue || 'null'}</span>
                      <br />
                      📏 **중요:** SelectContent의 높이가 뷰포트를 넘어가면 자동으로 ScrollButton들이 나타납니다.
                      <br />
                      ⚠️ 실제 사용 시에는 SelectTrigger에 고정 너비(w-[200px] 등)를 지정해야 합니다. 선택값에 따라 너비가 변하면 안 됩니다.
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1.2 8개 서브 컴포넌트 개요</h3>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-4 text-sm'>
                  <div className='p-3 bg-blue-50 rounded border'>
                    <div className='font-semibold text-blue-700'>SelectTrigger</div>
                    <div className='text-xs text-blue-600'>메인 버튼 (클릭 영역)</div>
                  </div>
                  <div className='p-3 bg-green-50 rounded border'>
                    <div className='font-semibold text-green-700'>SelectValue</div>
                    <div className='text-xs text-green-600'>선택된 값 표시</div>
                  </div>
                  <div className='p-3 bg-orange-50 rounded border'>
                    <div className='font-semibold text-orange-700'>SelectContent</div>
                    <div className='text-xs text-orange-600'>드롭다운 패널</div>
                  </div>
                  <div className='p-3 bg-pink-50 rounded border'>
                    <div className='font-semibold text-pink-700'>SelectItem</div>
                    <div className='text-xs text-pink-600'>개별 선택 옵션</div>
                  </div>
                  <div className='p-3 bg-cyan-50 rounded border'>
                    <div className='font-semibold text-cyan-700'>SelectLabel</div>
                    <div className='text-xs text-cyan-600'>그룹 라벨</div>
                  </div>
                  <div className='p-3 bg-red-50 rounded border'>
                    <div className='font-semibold text-red-700'>SelectSeparator</div>
                    <div className='text-xs text-red-600'>구분선</div>
                  </div>
                  <div className='p-3 bg-indigo-50 rounded border'>
                    <div className='font-semibold text-indigo-700'>SelectScrollUpButton</div>
                    <div className='text-xs text-indigo-600'>위쪽 스크롤 버튼</div>
                  </div>
                  <div className='p-3 bg-indigo-50 rounded border'>
                    <div className='font-semibold text-indigo-700'>SelectScrollDownButton</div>
                    <div className='text-xs text-indigo-600'>아래쪽 스크롤 버튼</div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1.3 CSS 클래스 자동 적용 여부</h3>
                <div className='p-4 bg-amber-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚠️ 중요: CSS 클래스는 자동으로 적용됩니다</h4>
                  <div className='space-y-3 text-sm'>
                    <div>
                      <strong className='text-green-600'>✅ 자동 적용:</strong> Radix UI Select + shadcn/ui 래핑으로 모든 스타일이 내장됨
                    </div>
                    <div>
                      <strong className='text-blue-600'>🎨 커스텀:</strong> className prop과 size prop으로 조정 가능
                    </div>
                    <div>
                      <strong className='text-purple-600'>📊 스크롤:</strong> 내용이 max-height를 넘으면 ScrollButton 자동 활성화
                    </div>
                    <div className='mt-4 p-3 bg-white rounded border'>
                     <pre className='text-xs'>{`// 기본 사용 (모든 스타일 자동 적용)
<Select>
 <SelectTrigger>
   <SelectValue placeholder="선택하세요" />
 </SelectTrigger>
 <SelectContent>
   <SelectItem value="option1">옵션 1</SelectItem>
   {/* 많은 아이템들... ScrollButton 자동 생성 */}
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
              <CardTitle>2. SelectScrollButton 실제 동작 검증</CardTitle>
              <CardDescription>실제 긴 목록으로 ScrollButton의 동작과 스타일링 확인</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2.1 ScrollButton 실제 렌더링 (강제 표시)</h3>
                <div className='p-4 bg-muted/30 rounded-lg border'>
                  <div className='text-sm text-muted-foreground mb-4'>
                    📋 CSS로 강제 표시된 실제 SelectScrollUpButton과 SelectScrollDownButton
                  </div>

                  <style>{`
      [data-state="closed"] .select-demo-content {
        display: block !important;
        visibility: visible !important;
        position: relative !important;
        transform: none !important;
        opacity: 1 !important;
      }
    `}</style>

                  <div className='space-y-4'>
                    <Select>
                      <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="ScrollButton 데모" />
                      </SelectTrigger>
                      <SelectContent
                        className="select-demo-content max-h-[120px]"
                      >
                        <SelectGroup>
                          <SelectLabel>그룹 1</SelectLabel>
                          {Array.from({ length: 15 }, (_, i) => (
                            <SelectItem key={`demo-${i}`} value={`demo-${i}`}>
                              데모 아이템 {i + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                    <div className='flex w-50 bg-white items-center justify-center py-1 border rounded-md'>
                      <ChevronUpIcon className='size-4' />
                    </div>
                    <div className='flex w-50 bg-white items-center justify-center py-1 border rounded-md'>
                      <ChevronDownIcon className='size-4' />
                    </div>
                    <div className='text-sm text-muted-foreground space-y-1'>
                      <div>👆 위 Select에서 ScrollButton의 실제 모양을 확인할 수 있습니다:</div>
                      <div>• 맨 위에 SelectScrollUpButton (ChevronUpIcon)</div>
                      <div>• 맨 아래에 SelectScrollDownButton (ChevronDownIcon)</div>
                      <div>• 실제 CSS 클래스: flex cursor-default items-center justify-center py-1</div>
                      <div>• 아이콘 크기: size-4 (16px)</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2.2 ScrollButton 실제 테스트</h3>
                <div className='p-4 bg-muted/30 rounded-lg border'>
                  <div className='text-sm text-muted-foreground mb-4'>
                    ⚠️ 아래 Select를 열어서 실제 ScrollButton이 어떻게 나타나는지 확인하세요.
                    <br />
                    📋 50개 아이템으로 스크롤이 필요한 상황을 만들었습니다.
                  </div>

                  <div className='flex flex-col gap-4'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>긴 목록 Select (50개 아이템)</label>
                      <Select value={selectedValue} onValueChange={setSelectedValue}>
                        <SelectTrigger className='w-[300px]'>
                          <SelectValue placeholder="아이템을 선택하세요 (총 50개)" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>그룹 1 (1-25)</SelectLabel>
                            {Array.from({ length: 25 }, (_, i) => (
                              <SelectItem key={`item-${i}`} value={`item-${i}`}>
                                아이템 {i + 1}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                          <SelectSeparator />
                          <SelectGroup>
                            <SelectLabel>그룹 2 (26-50)</SelectLabel>
                            {Array.from({ length: 25 }, (_, i) => (
                              <SelectItem key={`item-${i + 25}`} value={`item-${i + 25}`}>
                                아이템 {i + 26}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='text-sm text-muted-foreground space-y-1'>
                      <div>👆 위 Select를 클릭하여 열면:</div>
                      <div>• ScrollButton이 자동으로 나타나는지 확인</div>
                      <div>• 스크롤 위치에 따라 버튼이 활성화/비활성화되는지 확인</div>
                      <div>• 실제 CSS 클래스와 스타일링 확인</div>
                      <div>선택된 값: <span className='font-mono bg-gray-100 px-1 rounded'>{selectedValue || 'null'}</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2.3 ScrollButton CSS 클래스 분석</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='p-4 bg-blue-50 rounded-lg'>
                    <h4 className='font-medium text-sm mb-2'>SelectScrollUpButton</h4>
                    <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 클래스
flex cursor-default items-center justify-center py-1

// Radix가 설정하는 속성
data-slot="select-scroll-up-button"
aria-hidden="true" | "false"

// 내부 아이콘
<ChevronUpIcon className="size-4" />`}</pre>
                    <div className='space-y-1 text-xs'>
                      <div><span className='font-mono text-blue-600'>py-1:</span> padding-top/bottom: 4px</div>
                      <div><span className='font-mono text-blue-600'>cursor-default:</span> 기본 커서</div>
                      <div><span className='font-mono text-blue-600'>size-4:</span> 아이콘 16px</div>
                      <div><span className='font-mono text-blue-600'>위치:</span> SelectContent 최상단</div>
                    </div>
                  </div>

                  <div className='p-4 bg-green-50 rounded-lg'>
                    <h4 className='font-medium text-sm mb-2'>SelectScrollDownButton</h4>
                    <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 클래스
flex cursor-default items-center justify-center py-1

// Radix가 설정하는 속성
data-slot="select-scroll-down-button"
aria-hidden="true" | "false"

// 내부 아이콘
<ChevronDownIcon className="size-4" />`}</pre>
                    <div className='space-y-1 text-xs'>
                      <div><span className='font-mono text-green-600'>py-1:</span> padding-top/bottom: 4px</div>
                      <div><span className='font-mono text-green-600'>cursor-default:</span> 기본 커서</div>
                      <div><span className='font-mono text-green-600'>size-4:</span> 아이콘 16px</div>
                      <div><span className='font-mono text-green-600'>위치:</span> SelectContent 최하단</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-rose-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-3'>⚠️ 중요한 발견사항</h4>
                <div className='text-xs space-y-2'>
                  <div><strong>항상 렌더링:</strong> ScrollButton은 조건부 렌더링이 아니라 항상 DOM에 존재</div>
                  <div><strong>Radix 제어:</strong> 표시/숨김은 Radix UI가 내부적으로 제어</div>
                  <div><strong>뷰포트 의존:</strong> 사용자의 화면 크기와 브라우저 설정에 따라 나타나는 시점이 다름</div>
                  <div><strong>CSS 클래스:</strong> 실제로는 매우 간단한 스타일링 (flex + py-1)</div>
                  <div><strong>접근성:</strong> aria-hidden으로 스크린 리더에서 적절히 처리</div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>3. 각 컴포넌트의 실제 CSS 클래스 (Tailwind v4.1.11)</CardTitle>
              <CardDescription>실제 프로젝트에서 적용되는 모든 스타일 분석 - ScrollButton 포함</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='p-4 bg-blue-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>Select (루트 컨테이너)</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 자동으로 적용하는 속성
data-slot="select"

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
                  실제 사용 시에는 <code>className="w-[200px]"</code> 같은 고정 너비를 지정해야 선택값에 따라 레이아웃이 변하지 않습니다.
                </div>
                <div className='py-6 border rounded-lg flex gap-8 px-8 bg-white mb-4'>
                <Select value="" disabled onValueChange={() => {}} open={false} onOpenChange={() => {}} >
                  <SelectTrigger className="bg-white w-[200px]">
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                </Select>
                <Select value="" onValueChange={() => {}} open={false} onOpenChange={() => {}} >
                  <SelectTrigger size='sm' className="bg-white w-[200px]">
                    <SelectValue placeholder="선택하세요" />
                  </SelectTrigger>
                </Select>
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
data-slot="select-trigger"
data-size="default" | "sm"
data-state="closed" | "open"
data-placeholder (placeholder 상태일 때)
aria-expanded="false" | "true"
aria-haspopup="listbox"`}</pre>

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
                // 1) 테스트용 프리뷰
                <SelectContentPreview />

                <SelectContentPreview groupOption />
                <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 핵심 클래스들
bg-popover text-popover-foreground 
data-[state=open]:animate-in data-[state=closed]:animate-out 
data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 
data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 
data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 
data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 
relative z-50 max-h-[var(--radix-select-content-available-height)] 
min-w-[8rem] origin-[var(--radix-select-content-transform-origin)] 
overflow-x-hidden overflow-y-auto rounded-md border shadow-md

// position="popper" 일 때 추가 클래스들
data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 
data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1

// 내부 Viewport 스타일링
.SelectViewport: p-1, scroll-my-1 (position=popper일 때)

// Radix가 자동 설정하는 속성들
data-slot="select-content"
data-state="open" | "closed"
data-side="top" | "right" | "bottom" | "left"
data-align="start" | "center" | "end"
role="listbox"`}</pre>

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
                    <div><span className='font-mono text-indigo-600'>p-1:</span> Viewport padding: 4px</div>
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
data-state="checked" | "unchecked"
data-highlighted (키보드/마우스 호버 시)
data-disabled (비활성화 시)
role="option"
aria-selected="false" | "true"`}</pre>

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
<span className="absolute right-2 flex size-3.5 items-center justify-center">
 <SelectPrimitive.ItemIndicator>
   <CheckIcon className="size-4" />
 </SelectPrimitive.ItemIndicator>
</span>

// 실제 CSS 값
right-2: right: 8px
size-3.5: width/height: 14px (컨테이너)
size-4: width/height: 16px (아이콘)`}</pre>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-indigo-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>SelectScrollUpButton / SelectScrollDownButton (스크롤 버튼)</h4>
                <pre className='text-xs overflow-x-auto mb-3 bg-white p-2 rounded'>{`// shadcn이 적용하는 핵심 클래스들
flex cursor-default items-center justify-center py-1

// 자동 렌더링 조건
- SelectContent 내용이 뷰포트 높이를 초과할 때만 표시
- 스크롤 위치에 따라 자동으로 활성화/비활성화
- 클릭 시 부드러운 스크롤 애니메이션

// Radix가 자동 설정하는 속성들
data-slot="select-scroll-up-button" | "select-scroll-down-button"
data-state="visible" | "hidden"

// 내부 아이콘
ChevronUpIcon / ChevronDownIcon className="size-4"`}</pre>

                <div className='mt-4 space-y-2 text-xs'>
                  <h5 className='font-medium'>실제 CSS 값:</h5>
                  <div className='grid gap-1'>
                    <div><span className='font-mono text-indigo-600'>py-1:</span> padding-top/bottom: 4px</div>
                    <div><span className='font-mono text-indigo-600'>cursor-default:</span> 기본 커서 (버튼처럼 보이지 않음)</div>
                    <div><span className='font-mono text-indigo-600'>flex items-center justify-center:</span> 아이콘 중앙 정렬</div>
                    <div><span className='font-mono text-indigo-600'>size-4:</span> 아이콘 크기: 16px</div>
                    <div><span className='font-mono text-indigo-600'>위치:</span> SelectContent 맨 위/아래에 고정</div>
                  </div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
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
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>4. 실제 적용되는 CSS Values (프로젝트 커스텀)</CardTitle>
              <CardDescription>index.css에서 정의한 실제 색상값과 Tailwind v4 고유 기능들</CardDescription>
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
                  <h4 className='font-medium mb-3'>Tailwind v4 고유 기능들</h4>
                  <div className='space-y-2 text-sm font-mono'>
                    <div className='text-green-600 mb-2'>@starting-style (Tailwind v4 신기능):</div>
                    <div className='text-green-600 mb-2'>@starting-style (Tailwind v4 신기능):</div>
                    <div>fade-in-0: <span className='text-green-600'>@starting-style {`{ opacity: 0 }`}</span></div>
                    <div>zoom-in-95: <span className='text-green-600'>@starting-style {`{ scale: 0.95 }`}</span></div>
                    <div>slide-in-from-top-2: <span className='text-green-600'>@starting-style {`{ transform: translateY(-0.5rem) }`}</span></div>
                    <div className='text-purple-600 mb-2 mt-4'>애니메이션 지속시간:</div>
                    <div>animate-in: <span className='text-purple-600'>animation-duration: 150ms; ease-out</span></div>
                    <div>animate-out: <span className='text-purple-600'>animation-duration: 150ms; ease-in</span></div>
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
                      <div>p-1 (Viewport): <span className='text-purple-600'>4px</span></div>
                    </div>
                    <div>
                      <div className='font-medium mb-2'>Item & Scroll 크기:</div>
                      <div>py-1.5 (Item): <span className='text-orange-600'>6px</span></div>
                      <div>pl-2 (Item): <span className='text-orange-600'>8px</span></div>
                      <div>pr-8 (Item): <span className='text-orange-600'>32px</span></div>
                      <div>py-1 (ScrollButton): <span className='text-orange-600'>4px</span></div>
                      <div>size-4 (Icon): <span className='text-orange-600'>16px</span></div>
                    </div>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-indigo-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-3'>🎨 프로젝트 특징: OKLCH 색상 공간 + Tailwind v4</h4>
                <div className='text-xs space-y-2'>
                  <div>• <strong>OKLCH:</strong> 인간의 시각에 더 가까운 색상 표현</div>
                  <div>• <strong>더 정확한 명도:</strong> L(명도), C(채도), H(색조)로 구성</div>
                  <div>• <strong>색상 보간:</strong> 애니메이션 시 더 자연스러운 색상 변화</div>
                  <div>• <strong>접근성:</strong> 명도 기반으로 대비 계산이 더 정확</div>
                  <div>• <strong>커스텀 Radius:</strong> --radius: 0.625rem (10px) 프로젝트 고유 설정</div>
                  <div>• <strong>@starting-style:</strong> Tailwind v4의 새로운 애니메이션 기법</div>
                  <div>• <strong>@theme inline:</strong> 별도 config 파일 없이 index.css에서 설정</div>
                </div>
              </div>

              <div className='p-4 bg-yellow-50 rounded-lg'>
                <h4 className='font-medium text-sm mb-3'>⚙️ 프로젝트 고유 설정 방식</h4>
                <div className='text-xs space-y-2'>
                  <div>• <strong>Vite 플러그인:</strong> @tailwindcss/vite 사용 (별도 PostCSS 설정 불필요)</div>
                  <div>• <strong>Config 파일:</strong> tailwind.config.js 없음, index.css에서 @theme inline 사용</div>
                  <div>• <strong>CSS 변수:</strong> :root에서 직접 정의, 다크모드 미사용</div>
                  <div>• <strong>디자인 토큰:</strong> @theme에서 --color-* 형태로 매핑</div>
                </div>
                <div className='mt-3 p-3 bg-white rounded border text-xs'>
                  <strong>설정 구조:</strong>
                  <pre className='mt-2'>{`// vite.config.ts
import tailwindcss from '@tailwindcss/vite'
plugins: [tailwindcss()]

// index.css  
@theme inline {
 --color-popover: var(--popover);
 --color-border: var(--border);
 // ... 실제 Tailwind 클래스와 연결
}`}</pre>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>5. 추가 컴포넌트들 (SelectLabel, SelectSeparator, SelectGroup)</CardTitle>
              <CardDescription>그룹화 및 구분을 위한 보조 컴포넌트들과 실제 사용 패턴</CardDescription>
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
              <CardDescription>실제 사용 가능한 모든 Props와 기본값 - 디자이너가 알아야 할 옵션들</CardDescription>
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
              <CardDescription>실제 적용되는 애니메이션과 사용자 인터랙션 - Tailwind v4 @starting-style 포함</CardDescription>
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
                  <div className='mt-3 p-2 bg-white rounded text-xs'>
                    <strong>Tailwind v4 @starting-style:</strong>
                    <pre className='mt-1'>{`/* 기존 방식과 달리 더 자연스러운 애니메이션 */
.fade-in-0 {
 @starting-style {
   opacity: 0;
 }
}
.zoom-in-95 {
 @starting-style {
   scale: 0.95;
 }
}`}</pre>
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
                    <div className='mt-3'><strong>ScrollButton:</strong></div>
                    <div className='ml-4'>• 클릭: 부드러운 스크롤 이동</div>
                    <div className='ml-4'>• Page Up/Down: 큰 단위 스크롤</div>
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
                    <div className='mt-3'><strong>ScrollButton:</strong></div>
                    <div className='ml-4'>• Click: 스크롤 이동</div>
                    <div className='ml-4'>• Hover: 시각적 피드백 없음 (cursor-default)</div>
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
                    <div className='mt-3'><strong>ScrollButton 상태:</strong></div>
                    <div className='ml-4'>• 기본: text-muted-foreground</div>
                    <div className='ml-4'>• 스크롤 끝: 자동 숨김</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                8. 실제 프로젝트 사용 패턴
                <Badge variant='outline'>Real Usage</Badge>
              </CardTitle>
              <CardDescription>
                데이터 테이블 페이지네이션, SelectDropdown 컴포넌트 등 실제 프로젝트에서 사용되는 패턴들
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3 flex items-center gap-2'>
                    🎯 Data Table Pagination 패턴
                    <Badge variant='secondary' className='text-xs'>실제 사용중</Badge>
                  </h4>
                  <div className='space-y-3'>
                    <Select
                      value="10"
                      onValueChange={(value) => setRenderValue(value)}
                    >
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue placeholder="10" />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        {[10, 20, 30, 40, 50].map((pageSize) => (
                          <SelectItem key={pageSize} value={`${pageSize}`}>
                            {pageSize}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <div className='text-sm text-gray-700'>
                      선택값: {renderValue}
                    </div>

                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>실제 코드 (data-table-pagination.tsx)</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`// 페이지네이션에서 사용되는 패턴
<Select
  value={\`\${table.getState().pagination.pageSize}\`}
  onValueChange={(value) => {
    table.setPageSize(Number(value))
  }}
>
  <SelectTrigger className='h-8 w-[70px]'>
    <SelectValue placeholder={table.getState().pagination.pageSize} />
  </SelectTrigger>
  <SelectContent side='top'>
    {[10, 20, 30, 40, 50].map((pageSize) => (
      <SelectItem key={pageSize} value={\`\${pageSize}\`}>
        {pageSize}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

// 특징: 
// - 작은 사이즈 (h-8)
// - 고정 너비 (w-[70px])  
// - side='top' (위쪽으로 열림)
// - 숫자 value는 string 변환 필요`}</pre>
                    </details>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🔄 SelectDropdown 래퍼 패턴</h4>
                  <div className='space-y-3'>
                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>Pending 상태 (로딩중)</label>
                      <Select>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="로딩 중..." />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem disabled value='loading' className='h-14'>
                            <div className='flex items-center justify-center gap-2'>
                              <IconLoader className='h-5 w-5 animate-spin' />
                              {'  '}
                              Loading...
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='space-y-2'>
                      <label className='text-sm font-medium'>데이터 로드 완료 상태</label>
                      <Select value={loadingValue} onValueChange={setLoadingValue}>
                        <SelectTrigger className="w-[200px]">
                          <SelectValue placeholder="상태 선택" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">✅ 활성</SelectItem>
                          <SelectItem value="inactive">❌ 비활성</SelectItem>
                          <SelectItem value="pending">⏳ 대기중</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className='w-40 border rounded-md'>
                    <SelectLoadingRow />
                    </div>

                    <div className='p-3 bg-blue-50 rounded text-xs'>
                      <strong>Pending 상황:</strong>
                      <div className='mt-2 space-y-1'>
                        <div>• <strong>언제:</strong> API 호출로 옵션 데이터를 가져오는 중</div>
                        <div>• <strong>표시:</strong> 로딩 스피너 + "Loading..." 텍스트</div>
                        <div>• <strong>높이:</strong> h-14 (56px) - 일반 아이템보다 높음</div>
                        <div>• <strong>상태:</strong> disabled로 선택 불가</div>
                        <div>• <strong>정렬:</strong> justify-center로 중앙 정렬</div>
                      </div>
                    </div>

                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>실제 코드 (select-dropdown.tsx)</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`// SelectDropdown에서 pending 처리
{isPending ? (
  <SelectItem disabled value='loading' className='h-14 justify-center'>
    <div className='flex items-center justify-center gap-2'>
      <IconLoader className='h-5 w-5 animate-spin' />
      <span>Loading...</span>
    </div>
  </SelectItem>
) : (
  items?.map(({ label, value }) => (
    <SelectItem key={value} value={value}>
      {label}
    </SelectItem>
  ))
)}

// Pending 상태 스타일링:
// - h-14: 높이 56px (일반 32px보다 높음)
// - justify-center: 내용 중앙 정렬  
// - disabled: 선택 불가 상태
// - animate-spin: 스피너 회전 애니메이션
// - gap-2: 스피너와 텍스트 사이 8px 간격

// 실제 사용 예시:
const [isPending, setIsPending] = useState(true)
const [items, setItems] = useState([])

useEffect(() => {
  fetchSelectOptions()
    .then(setItems)
    .finally(() => setIsPending(false))
}, [])`}</pre>
                    </details>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🚨 에러 상태 패턴</h4>
                  <div className='space-y-3'>
                    <Select>
                      <SelectTrigger className="w-[200px] border-destructive ring-destructive/20 ring-[3px]">
                        <SelectValue placeholder="에러 상태" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="option1">옵션 1</SelectItem>
                        <SelectItem value="option2">옵션 2</SelectItem>
                      </SelectContent>
                    </Select>
                    <p className='text-destructive text-sm'>이 필드는 필수입니다.</p>
                    <details className='text-xs text-muted-foreground'>
                      <summary className='cursor-pointer font-medium'>에러 상태 구현</summary>
                      <pre className='mt-2 p-2 bg-muted rounded text-xs overflow-x-auto'>{`// aria-invalid 사용 시 자동 적용
<SelectTrigger aria-invalid={!!error}>
  <SelectValue placeholder="선택하세요" />
</SelectTrigger>

// CSS 적용값:
// border-destructive: oklch(0.577 0.245 27.325)
// ring-destructive/20: same color with 20% opacity
// ring-[3px]: 3px ring thickness`}</pre>
                    </details>
                  </div>
                </div>

                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>📱 사이즈 변형 비교</h4>
                  <div className='space-y-3'>
                    <div className='space-y-2'>
                      <label className='text-xs text-muted-foreground'>작은 사이즈 (h-8 = 32px)</label>
                      <Select>
                        <SelectTrigger size="sm" className="w-[180px]">
                          <SelectValue placeholder="Small Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small1">작은 옵션 1</SelectItem>
                          <SelectItem value="small2">작은 옵션 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='space-y-2'>
                      <label className='text-xs text-muted-foreground'>기본 사이즈 (h-9 = 36px)</label>
                      <Select>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Default Size" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="normal1">기본 옵션 1</SelectItem>
                          <SelectItem value="normal2">기본 옵션 2</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className='text-xs text-muted-foreground'>
                      데이터 테이블에서는 sm, 일반 폼에서는 default 사용
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                9. 피그마 디자인 시스템 완벽 구현 가이드
                <Badge variant='outline'>Design Tokens</Badge>
              </CardTitle>
              <CardDescription>
                피그마에서 Select 컴포넌트를 정확히 구현하기 위한 상세 가이드 - 모든 측정값과 설정 포함
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-6'>
                <div className='p-4 border rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>🎨 Master Components 구조</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectTrigger 변형들 (실측값)</h5>
                      <div className='space-y-3'>
                        <div className='space-y-2'>
                          <span className='text-xs text-muted-foreground'>Default (정확히 36px 높이)</span>
                          <div className='flex items-center gap-2'>
                            <Select>
                              <SelectTrigger className="w-[200px]">
                                <SelectValue placeholder="36px 높이" />
                              </SelectTrigger>
                            </Select>
                            <span className='text-xs font-mono text-blue-600'>h-9 = 36px</span>
                          </div>
                        </div>
                        <div className='space-y-2'>
                          <span className='text-xs text-muted-foreground'>Small (정확히 32px 높이)</span>
                          <div className='flex items-center gap-2'>
                            <Select>
                              <SelectTrigger size="sm" className="w-[200px]">
                                <SelectValue placeholder="32px 높이" />
                              </SelectTrigger>
                            </Select>
                            <span className='text-xs font-mono text-blue-600'>h-8 = 32px</span>
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
                      <h5 className='font-medium text-xs mb-3'>정확한 측정값</h5>
                      <div className='text-xs space-y-2 font-mono'>
                        <div>• <strong>기본 높이:</strong> 정확히 36px (h-9)</div>
                        <div>• <strong>작은 높이:</strong> 정확히 32px (h-8)</div>
                        <div>• <strong>최소 너비:</strong> 128px (min-w-[8rem])</div>
                        <div>• <strong>패딩:</strong> 8px 12px (py-2 px-3)</div>
                        <div>• <strong>내부 간격:</strong> 8px (gap-2)</div>
                        <div>• <strong>테두리:</strong> 1px solid</div>
                        <div>• <strong>둥근 모서리:</strong> 8px (rounded-md)</div>
                        <div>• <strong>포커스 링:</strong> 정확히 3px 두께</div>
                        <div>• <strong>아이콘 크기:</strong> 16px (size-4)</div>
                        <div>• <strong>아이콘 투명도:</strong> 50% (opacity-50)</div>
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
                  <h4 className='font-medium text-sm mb-3'>📐 SelectContent & SelectItem 정밀 구조</h4>
                  <div className='grid grid-cols-1 gap-6'>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectContent (드롭다운) - 실측 기준</h5>
                      <div className='flex flex-col lg:flex-row gap-6'>
                        <div className='border rounded-md bg-white shadow-md p-1 w-[200px] flex-shrink-0'>
                          <div className='py-1 flex justify-center border-b text-muted-foreground'>
                            <ChevronUpIcon className='h-4 w-4' />
                          </div>
                          <div className='px-2 py-1.5 text-xs text-muted-foreground'>과일</div>
                          <div className='px-2 py-1.5 text-sm rounded-sm hover:bg-accent cursor-pointer'>사과</div>
                          <div className='px-2 py-1.5 text-sm rounded-sm bg-accent relative pr-8'>
                            바나나
                            <span className='absolute right-2 top-1/2 -translate-y-1/2 text-xs'>✓</span>
                          </div>
                          <div className='h-px bg-border my-1 -mx-1'></div>
                          <div className='px-2 py-1.5 text-xs text-muted-foreground'>채소</div>
                          <div className='px-2 py-1.5 text-sm rounded-sm hover:bg-accent cursor-pointer'>당근</div>
                          <div className='py-1 flex justify-center border-t text-muted-foreground'>
                            <ChevronDownIcon className='h-4 w-4' />
                          </div>
                        </div>
                        <div className='text-xs font-mono space-y-1 flex-shrink-0'>
                          <div className='text-purple-600'>min-w: 128px (정확)</div>
                          <div className='text-orange-600'>padding: 4px (정확)</div>
                          <div className='text-cyan-600'>radius: 8px (정확)</div>
                          <div className='text-red-600'>shadow: md (정확)</div>
                          <div className='text-indigo-600'>z-index: 50 (정확)</div>
                          <div className='text-green-600'>border: 1px solid (정확)</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectItem 상세 구조 - 피그마 설정용</h5>
                      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                        <div className='text-xs space-y-2 font-mono'>
                          <div>• <strong>높이:</strong> 정확히 32px (고정)</div>
                          <div>• <strong>패딩:</strong> 6px 32px 6px 8px (정확)</div>
                          <div>• <strong>텍스트:</strong> 14px (text-sm, 정확)</div>
                          <div>• <strong>둥근 모서리:</strong> 2px (rounded-sm, 정확)</div>
                          <div>• <strong>체크 아이콘:</strong> 16px, 우측 8px (정확)</div>
                          <div>• <strong>체크 컨테이너:</strong> 14px (size-3.5, 정확)</div>
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
                        <div>• <strong>Spacing:</strong> 8px (정확)</div>
                        <div>• <strong>Padding:</strong> 8px 12px (정확)</div>
                        <div>• <strong>Alignment:</strong> Space between</div>
                        <div>• <strong>Sizing:</strong> Fixed width 권장</div>
                        <div>• <strong>Height:</strong> 36px/32px (정확)</div>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <h5 className='font-medium text-xs'>SelectContent</h5>
                      <div className='text-xs space-y-1'>
                        <div>• <strong>Direction:</strong> Vertical</div>
                        <div>• <strong>Spacing:</strong> 0px (정확)</div>
                        <div>• <strong>Padding:</strong> 4px (정확)</div>
                        <div>• <strong>Max Height:</strong> viewport dependent</div>
                        <div>• <strong>Overflow:</strong> Scroll</div>
                        <div>• <strong>Min Width:</strong> 128px (정확)</div>
                      </div>
                    </div>
                    <div className='space-y-3'>
                      <h5 className='font-medium text-xs'>SelectItem</h5>
                      <div className='text-xs space-y-1'>
                        <div>• <strong>Direction:</strong> Horizontal</div>
                        <div>• <strong>Height:</strong> 32px (Fixed, 정확)</div>
                        <div>• <strong>Padding:</strong> 6px 8px (정확)</div>
                        <div>• <strong>Alignment:</strong> Left</div>
                        <div>• <strong>Icon Space:</strong> 32px (right, 정확)</div>
                        <div>• <strong>Gap:</strong> 8px (정확)</div>
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
                          <div>• Default (정확히 36px)</div>
                          <div>• Small (정확히 32px)</div>
                        </div>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>State (Boolean)</div>
                          <div>• Focus (ring 3px)</div>
                          <div>• Error (red border + ring)</div>
                          <div>• Disabled (50% opacity)</div>
                        </div>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>Width (Instance Swap)</div>
                          <div>• w-[70px] (pagination용)</div>
                          <div>• w-[180px] (일반 small)</div>
                          <div>• w-[200px] (일반 medium)</div>
                          <div>• w-[300px] (일반 large)</div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h5 className='font-medium text-xs mb-3'>SelectItem Properties</h5>
                      <div className='space-y-3'>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>State (Variant)</div>
                          <div>• Default (투명 배경)</div>
                          <div>• Hover (accent 배경)</div>
                          <div>• Selected (accent + 체크)</div>
                          <div>• Disabled (50% opacity)</div>
                        </div>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>Content</div>
                          <div>• Text (Instance Swap)</div>
                          <div>• Icon (Optional, 왼쪽)</div>
                          <div>• Check Icon (Selected 시에만)</div>
                        </div>
                        <div className='p-3 bg-muted/50 rounded text-xs'>
                          <div className='font-medium mb-2'>Type (Variant)</div>
                          <div>• Regular (일반 아이템)</div>
                          <div>• Label (그룹 라벨, 12px)</div>
                          <div>• Separator (1px 선)</div>
                          <div>• Loading (스피너 + 높이 56px)</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className='p-4 bg-slate-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>📋 체크리스트 - 피그마 구현 완료 확인</h4>
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4 text-xs'>
                    <div className='space-y-2'>
                      <h5 className='font-medium'>필수 컴포넌트 구조</h5>
                      <div className='space-y-1'>
                        <div>□ SelectTrigger 기본/작은 사이즈 variant 생성</div>
                        <div>□ SelectContent 드롭다운 패널 생성</div>
                        <div>□ SelectItem 4가지 상태 구현</div>
                        <div>□ SelectScrollUpButton/DownButton 추가</div>
                        <div>□ SelectLabel, SelectSeparator 보조 컴포넌트</div>
                        <div>□ 체크 아이콘 위치 및 크기 정확히 설정</div>
                      </div>
                    </div>
                    <div className='space-y-2'>
                      <h5 className='font-medium'>스타일 완성</h5>
                      <div className='space-y-1'>
                        <div>□ 정확한 색상값 (OKLCH → HEX) 적용</div>
                        <div>□ Auto Layout 설정 완료</div>
                        <div>□ Component Properties 설정</div>
                        <div>□ 모든 측정값이 정확한 픽셀값과 일치</div>
                        <div>□ 실제 사용 패턴 기반 variant 구성</div>
                        <div>□ ScrollButton 조건부 표시 설정</div>
                      </div>
                    </div>
                  </div>
                  <div className='mt-4 p-3 bg-white rounded border text-xs'>
                    <strong>⚠️ 중요 주의사항:</strong>
                    <div className='mt-2 space-y-1'>
                      <div>• SelectTrigger는 반드시 고정 너비 또는 최소 너비 설정</div>
                      <div>• SelectContent는 SelectTrigger보다 작아지면 안 됨 (min-width: 128px)</div>
                      <div>• 모든 상태는 실제 CSS와 정확히 일치해야 함</div>
                      <div>• 체크 아이콘은 선택된 상태에서만 표시</div>
                      <div>• ScrollButton은 내용이 많을 때만 조건부 표시</div>
                      <div>• 애니메이션은 150ms ease-out/in으로 설정</div>
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