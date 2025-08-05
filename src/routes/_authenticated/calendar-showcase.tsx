import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
import { ko } from 'date-fns/locale'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Label } from '@/components/ui/label'
import { Calendar } from '@/components/ui/calendar'
import { DatePicker } from '@/components/date-picker'
import { KoreanDatePicker } from '@/components/korean-date-picker'

export const Route = createFileRoute('/_authenticated/calendar-showcase')({
  component: CalendarShowcase,
})

function CalendarShowcase() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()
  const [koreanDate, setKoreanDate] = useState<Date | undefined>()

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
            <h1 className='text-3xl font-bold tracking-tight'>Calendar Showcase</h1>
            <p className='text-muted-foreground mt-2'>
              Calendar 컴포넌트의 모든 스타일링과 한국어 설정 분석
            </p>
          </div>

          {/* 기본 Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                기본 Calendar 컴포넌트
                <Badge variant='secondary'>Default</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                <h4 className='font-medium text-sm'>기본 설정:</h4>
                <div className='grid gap-1 text-xs font-mono'>
                  <div><span className='text-blue-600'>언어:</span> 영어 (기본값)</div>
                  <div><span className='text-green-600'>월 순서:</span> Month - Year</div>
                  <div><span className='text-purple-600'>요일:</span> Sun, Mon, Tue, Wed, Thu, Fri, Sat</div>
                  <div><span className='text-orange-600'>날짜 형식:</span> MM/DD/YYYY</div>
                </div>
              </div>

              <div className='flex justify-center'>
                <Calendar
                  mode='single'
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className='rounded-md border'
                />
              </div>
            </CardContent>
          </Card>

          {/* 한국어 Calendar */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                한국어 Calendar
                <Badge variant='secondary'>Korean Locale</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                <h4 className='font-medium text-sm'>한국어 설정:</h4>
                <div className='grid gap-1 text-xs font-mono'>
                  <div><span className='text-blue-600'>언어:</span> 한국어 (date-fns/locale/ko)</div>
                  <div><span className='text-green-600'>드롭다운 순서:</span> Year년 Month월 (flex-row-reverse)</div>
                  <div><span className='text-purple-600'>요일:</span> 일, 월, 화, 수, 목, 금, 토</div>
                  <div><span className='text-orange-600'>날짜 형식:</span> YYYY년 MM월 DD일</div>
                  <div><span className='text-cyan-600'>캡션 레이아웃:</span> dropdown (년도/월 선택 가능)</div>
                </div>
              </div>

              <div className='flex justify-center'>
                <Calendar
                  mode='single'
                  captionLayout='dropdown'
                  selected={koreanDate}
                  onSelect={setKoreanDate}
                  locale={ko}
                  className='rounded-md border'
                  disabled={(date: Date) =>
                    date > new Date() || date < new Date('1900-01-01')
                  }
                  classNames={{
                    dropdowns: 'flex flex-row-reverse items-center justify-center gap-1.5 text-sm font-medium h-8'
                  }}
                  formatters={{
                    formatCaption: (date) => {
                      return `${date.getFullYear()}년 ${date.getMonth() + 1}월`
                    },
                    formatYearDropdown: (date) => {
                      return `${date.getFullYear()}년`
                    },
                    formatMonthDropdown: (date) => {
                      return `${date.getMonth() + 1}월`
                    },
                    formatWeekdayName: (date) => {
                      const weekdays = ['일', '월', '화', '수', '목', '금', '토']
                      return weekdays[date.getDay()]
                    }
                  }}
                />
              </div>
            </CardContent>
          </Card>

          {/* DatePicker 비교 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                DatePicker 컴포넌트 비교
                <Badge variant='secondary'>Popover + Calendar</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                <h4 className='font-medium text-sm'>DatePicker 구조:</h4>
                <div className='grid gap-2 text-xs font-mono'>
                  <div><span className='text-blue-600'>Trigger:</span> Button (Input 스타일링) + Calendar Icon</div>
                  <div><span className='text-green-600'>Popover:</span> shadcn/ui Popover 컴포넌트</div>
                  <div><span className='text-purple-600'>Content:</span> Calendar 컴포넌트 (위에서 분석한 한국어 설정)</div>
                  <div><span className='text-orange-600'>Format:</span> date-fns format() 함수로 선택된 날짜 표시</div>
                </div>
              </div>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                <div className='space-y-3'>
                  <Label>기본 DatePicker (영어)</Label>
                  <DatePicker
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    placeholder='Pick a date'
                  />
                  <div className='text-xs text-muted-foreground space-y-1'>
                    <div>• 월-년 순서 드롭다운</div>
                    <div>• 영어 요일 (Sun, Mon, ...)</div>
                    <div>• 날짜 포맷: MMM d, yyyy</div>
                  </div>
                </div>
                <div className='space-y-3'>
                  <Label>한국어 DatePicker</Label>
                  <KoreanDatePicker
                    selected={koreanDate}
                    onSelect={setKoreanDate}
                    placeholder='날짜를 선택하세요'
                  />
                  <div className='text-xs text-muted-foreground space-y-1'>
                    <div>• 년-월 순서 드롭다운 (flex-row-reverse)</div>
                    <div>• 한국어 요일 (일, 월, 화, ...)</div>
                    <div>• 날짜 포맷: yyyy년 MM월 dd일</div>
                    <div>• Korean locale + 커스텀 formatters</div>
                  </div>
                </div>
              </div>

              <div className='p-4 bg-blue-50 dark:bg-blue-950 rounded-lg'>
                <h4 className='font-medium text-sm mb-2'>한국어 DatePicker 전체 코드:</h4>
                <pre className='text-xs overflow-x-auto'>{`<Calendar
  mode='single'
  captionLayout='dropdown'
  selected={selected}
  onSelect={onSelect}
  locale={ko}
  classNames={{
    dropdowns: 'flex flex-row-reverse items-center justify-center gap-1.5 text-sm font-medium h-8'
  }}
  formatters={{
    formatCaption: (date) => \`\${date.getFullYear()}년 \${date.getMonth() + 1}월\`,
    formatYearDropdown: (date) => \`\${date.getFullYear()}년\`,
    formatMonthDropdown: (date) => \`\${date.getMonth() + 1}월\`,
    formatWeekdayName: (date) => {
      const weekdays = ['일', '월', '화', '수', '목', '금', '토']
      return weekdays[date.getDay()]
    }
  }}
/>`}</pre>
              </div>
            </CardContent>
          </Card>

          {/* 한국어 Calendar 스타일링 분석 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                한국어 Calendar 스타일링 분석
                <Badge variant='secondary'>Korean Specific</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              {/* 드롭다운 순서 제어 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1. 드롭다운 순서 제어 (년-월)</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`classNames={{
  dropdowns: 'flex flex-row-reverse items-center justify-center gap-1.5 text-sm font-medium h-8'
}}`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>flex-row-reverse:</span> 드롭다운 순서 뒤바꿈 ([월][년] → [년][월])</div>
                    <div><span className='font-mono text-green-600'>items-center justify-center:</span> 드롭다운들을 중앙 정렬</div>
                    <div><span className='font-mono text-purple-600'>gap-1.5:</span> 년도/월 드롭다운 간 6px 간격</div>
                    <div><span className='font-mono text-orange-600'>text-sm font-medium:</span> 14px 중간 굵기 폰트</div>
                    <div><span className='font-mono text-cyan-600'>h-8:</span> 드롭다운 영역 높이 32px</div>
                  </div>
                </div>
              </div>

              {/* 한국어 Formatters */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2. 한국어 Formatters</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`formatters={{
  formatCaption: (date) => {
    return \`\${date.getFullYear()}년 \${date.getMonth() + 1}월\`
  },
  formatYearDropdown: (date) => {
    return \`\${date.getFullYear()}년\`
  },
  formatMonthDropdown: (date) => {
    return \`\${date.getMonth() + 1}월\`
  },
  formatWeekdayName: (date) => {
    const weekdays = ['일', '월', '화', '수', '목', '금', '토']
    return weekdays[date.getDay()]
  }
}}`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>formatCaption:</span> 상단 캡션을 "2024년 12월" 형식으로 표시</div>
                    <div><span className='font-mono text-green-600'>formatYearDropdown:</span> 년도 드롭다운을 "2024년" 형식으로</div>
                    <div><span className='font-mono text-purple-600'>formatMonthDropdown:</span> 월 드롭다운을 "12월" 형식으로</div>
                    <div><span className='font-mono text-orange-600'>formatWeekdayName:</span> 요일을 한국어로 (일, 월, 화, 수, 목, 금, 토)</div>
                  </div>
                </div>
              </div>

              {/* captionLayout 분석 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>3. Caption Layout 설정</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`captionLayout='dropdown'`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>dropdown:</span> 년도/월을 드롭다운으로 선택 가능</div>
                    <div><span className='font-mono text-green-600'>label (기본값):</span> 단순 텍스트 표시, 이전/다음 버튼으로만 이동</div>
                    <div><span className='font-mono text-purple-600'>buttons:</span> 버튼 형태로 표시</div>
                    <div><span className='font-mono text-orange-600'>장점:</span> 빠른 연도/월 이동 가능 (1990년 → 2024년 등)</div>
                  </div>
                </div>
              </div>

              {/* 한국어 locale 효과 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>4. date-fns 한국어 Locale 효과</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`import { ko } from 'date-fns/locale'

<Calendar locale={ko} />`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>주간 시작일:</span> 일요일 (한국 기준)</div>
                    <div><span className='font-mono text-green-600'>월 이름:</span> 1월, 2월, ... 12월</div>
                    <div><span className='font-mono text-purple-600'>요일 이름:</span> 일요일, 월요일, ... 토요일</div>
                    <div><span className='font-mono text-orange-600'>날짜 포맷:</span> YYYY년 MM월 DD일 형식</div>
                    <div><span className='font-mono text-cyan-600'>formatters와 조합:</span> locale 기본값 + 커스텀 formatter 적용</div>
                  </div>
                </div>
              </div>

              {/* 실제 렌더링 구조 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>5. 실제 HTML 구조</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`<!-- 드롭다운 영역 -->
<div class="rdp-dropdowns flex flex-row-reverse items-center justify-center gap-1.5 text-sm font-medium h-8">
  <!-- 년도 드롭다운 (flex-row-reverse로 먼저 표시) -->
  <div class="rdp-dropdown_root">
    <select>
      <option>2024년</option>
      <option>2023년</option>
    </select>
  </div>
  
  <!-- 월 드롭다운 (두 번째로 표시) -->
  <div class="rdp-dropdown_root">
    <select>
      <option>12월</option>
      <option>11월</option>
    </select>
  </div>
</div>

<!-- 요일 헤더 -->
<div class="rdp-weekdays">
  <div>일</div><div>월</div><div>화</div><div>수</div><div>목</div><div>금</div><div>토</div>
</div>`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>rdp-dropdowns:</span> react-day-picker 드롭다운 컨테이너</div>
                    <div><span className='font-mono text-green-600'>flex-row-reverse:</span> 자식 요소 순서를 뒤바꿈</div>
                    <div><span className='font-mono text-purple-600'>select 요소:</span> 실제 브라우저 드롭다운</div>
                  </div>
                </div>
              </div>

              {/* CSS Override 우선순위 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>6. CSS 우선순위 및 Override</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`// 1. react-day-picker 기본 스타일
.rdp-dropdowns { display: flex; }

// 2. shadcn/ui Calendar 기본 스타일  
dropdowns: cn('w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5')

// 3. 한국어 Calendar 커스텀 스타일 (최우선)
classNames={{ 
  dropdowns: 'flex flex-row-reverse items-center justify-center gap-1.5 text-sm font-medium h-8'
}}`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>우선순위:</span> 커스텀 classNames &gt; shadcn 기본값 &gt; react-day-picker 기본값</div>
                    <div><span className='font-mono text-green-600'>Override 방식:</span> cn() 함수로 클래스 병합</div>  
                    <div><span className='font-mono text-purple-600'>핵심 변경:</span> justify-center → flex-row-reverse 추가</div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* CSS 스타일링 분석 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Calendar CSS 스타일링 분석
                <Badge variant='secondary'>Deep Dive</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              
              {/* 루트 스타일 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1. 루트 컨테이너 스타일</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`className={cn(
  'bg-background group/calendar p-3 [--cell-size:--spacing(8)] [[data-slot=card-content]_&]:bg-transparent [[data-slot=popover-content]_&]:bg-transparent',
  String.raw\`rtl:**:[.rdp-button\_next>svg]:rotate-180\`,
  String.raw\`rtl:**:[.rdp-button\_previous>svg]:rotate-180\`,
  className
)}`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>bg-background:</span> 배경색 설정 (CSS Variable)</div>
                    <div><span className='font-mono text-green-600'>group/calendar:</span> 그룹 스타일링을 위한 클래스</div>
                    <div><span className='font-mono text-purple-600'>p-3:</span> 패딩 12px (모든 방향)</div>
                    <div><span className='font-mono text-orange-600'>[--cell-size:--spacing(8)]:</span> CSS 커스텀 속성 - 셀 크기 32px</div>
                    <div><span className='font-mono text-cyan-600'>[[data-slot=card-content]_&]:bg-transparent:</span> Card 내부에서 배경 투명</div>
                    <div><span className='font-mono text-pink-600'>rtl: 스타일:</span> 오른쪽에서 왼쪽 언어 지원 (아랍어 등)</div>
                  </div>
                </div>
              </div>

              {/* 네비게이션 스타일 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2. 네비게이션 영역</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`nav: cn(
  'flex items-center gap-1 w-full absolute top-0 inset-x-0 justify-between',
  defaultClassNames.nav
)`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>flex items-center:</span> Flexbox로 세로 중앙 정렬</div>
                    <div><span className='font-mono text-green-600'>gap-1:</span> 자식 요소 간 4px 간격</div>
                    <div><span className='font-mono text-purple-600'>w-full:</span> 전체 너비</div>
                    <div><span className='font-mono text-orange-600'>absolute top-0:</span> 절대 위치, 상단 고정</div>
                    <div><span className='font-mono text-cyan-600'>inset-x-0:</span> 좌우 0 (left: 0, right: 0)</div>
                    <div><span className='font-mono text-pink-600'>justify-between:</span> 양쪽 끝으로 정렬</div>
                  </div>
                </div>
              </div>

              {/* 버튼 스타일 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>3. 이전/다음 버튼</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`button_previous: cn(
  buttonVariants({ variant: buttonVariant }),
  'size-(--cell-size) aria-disabled:opacity-50 p-0 select-none',
  defaultClassNames.button_previous
)`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>buttonVariants():</span> shadcn Button 컴포넌트 스타일 적용</div>
                    <div><span className='font-mono text-green-600'>size-(--cell-size):</span> 크기 32px × 32px (CSS Variable 사용)</div>
                    <div><span className='font-mono text-purple-600'>aria-disabled:opacity-50:</span> 비활성화 시 50% 투명도</div>
                    <div><span className='font-mono text-orange-600'>p-0:</span> 패딩 제거</div>
                    <div><span className='font-mono text-cyan-600'>select-none:</span> 텍스트 선택 방지</div>
                  </div>
                </div>
              </div>

              {/* 월/년도 표시 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>4. 월/년도 표시 영역</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`month_caption: cn(
  'flex items-center justify-center h-(--cell-size) w-full px-(--cell-size)',
  defaultClassNames.month_caption
)`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>flex items-center justify-center:</span> Flexbox 중앙 정렬</div>
                    <div><span className='font-mono text-green-600'>h-(--cell-size):</span> 높이 32px</div>
                    <div><span className='font-mono text-purple-600'>w-full:</span> 전체 너비</div>
                    <div><span className='font-mono text-orange-600'>px-(--cell-size):</span> 좌우 패딩 32px</div>
                  </div>
                </div>
              </div>

              {/* 드롭다운 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>5. 월/년도 드롭다운</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`dropdowns: cn(
  'w-full flex items-center text-sm font-medium justify-center h-(--cell-size) gap-1.5',
  defaultClassNames.dropdowns
),
dropdown_root: cn(
  'relative has-focus:border-ring border border-input shadow-xs has-focus:ring-ring/50 has-focus:ring-[3px] rounded-md',
  defaultClassNames.dropdown_root
)`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>text-sm font-medium:</span> 14px 중간 굵기</div>
                    <div><span className='font-mono text-green-600'>gap-1.5:</span> 드롭다운 간 6px 간격</div>
                    <div><span className='font-mono text-purple-600'>has-focus:border-ring:</span> 포커스 시 테두리 색상 변경</div>
                    <div><span className='font-mono text-orange-600'>has-focus:ring-ring/50:</span> 포커스 시 링 효과 (50% 투명도)</div>
                    <div><span className='font-mono text-cyan-600'>has-focus:ring-[3px]:</span> 포커스 링 3px 두께</div>
                  </div>
                </div>
              </div>

              {/* 요일 헤더 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>6. 요일 헤더</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`weekday: cn(
  'text-muted-foreground rounded-md flex-1 font-normal text-[0.8rem] select-none',
  defaultClassNames.weekday
)`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>text-muted-foreground:</span> 회색 텍스트 색상</div>
                    <div><span className='font-mono text-green-600'>rounded-md:</span> 6px 모서리 둥글게</div>
                    <div><span className='font-mono text-purple-600'>flex-1:</span> 남은 공간 균등 분할</div>
                    <div><span className='font-mono text-orange-600'>font-normal:</span> 일반 굵기 (400)</div>
                    <div><span className='font-mono text-cyan-600'>text-[0.8rem]:</span> 12.8px 폰트 크기</div>
                  </div>
                </div>
              </div>

              {/* 날짜 버튼 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>7. 날짜 버튼 (가장 복잡)</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`CalendarDayButton:
data-[selected-single=true]:bg-primary 
data-[selected-single=true]:text-primary-foreground 
data-[range-middle=true]:bg-accent 
data-[range-middle=true]:text-accent-foreground 
data-[range-start=true]:bg-primary 
data-[range-start=true]:text-primary-foreground 
data-[range-end=true]:bg-primary 
data-[range-end=true]:text-primary-foreground 
group-data-[focused=true]/day:border-ring 
group-data-[focused=true]/day:ring-ring/50 
group-data-[focused=true]/day:relative 
group-data-[focused=true]/day:z-10 
group-data-[focused=true]/day:ring-[3px]`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>data-[selected-single=true]:</span> 단일 선택된 날짜 스타일</div>
                    <div><span className='font-mono text-green-600'>data-[range-*]:</span> 날짜 범위 선택 시 스타일</div>
                    <div><span className='font-mono text-purple-600'>group-data-[focused=true]/day:</span> 포커스된 날짜 스타일</div>
                    <div><span className='font-mono text-orange-600'>z-10:</span> 포커스 링이 다른 요소 위에 표시</div>
                    <div><span className='font-mono text-cyan-600'>aspect-square:</span> 정사각형 비율 유지</div>
                  </div>
                </div>
              </div>

              {/* 오늘 날짜 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>8. 오늘 날짜 표시</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`today: cn(
  'bg-accent text-accent-foreground rounded-md data-[selected=true]:rounded-none',
  defaultClassNames.today
)`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>bg-accent:</span> 강조 배경색</div>
                    <div><span className='font-mono text-green-600'>text-accent-foreground:</span> 강조 텍스트 색상</div>
                    <div><span className='font-mono text-purple-600'>data-[selected=true]:rounded-none:</span> 선택 시 모서리 각지게</div>
                  </div>
                </div>
              </div>

              {/* 비활성화/외부 날짜 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>9. 비활성화 및 외부 날짜</h3>
                <div className='p-4 bg-muted/50 rounded-lg'>
                  <pre className='text-xs overflow-x-auto'>{`outside: cn(
  'text-muted-foreground aria-selected:text-muted-foreground',
  defaultClassNames.outside
),
disabled: cn(
  'text-muted-foreground opacity-50',
  defaultClassNames.disabled
)`}</pre>
                  <div className='mt-3 space-y-2 text-sm'>
                    <div><span className='font-mono text-blue-600'>outside:</span> 현재 월이 아닌 날짜 (이전/다음 월)</div>
                    <div><span className='font-mono text-green-600'>disabled:</span> 선택 불가능한 날짜</div>
                    <div><span className='font-mono text-purple-600'>opacity-50:</span> 50% 투명도로 비활성화 표시</div>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>

          {/* CSS Variables 분석 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                CSS 커스텀 속성 (Variables)
                <Badge variant='secondary'>CSS Variables</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='p-4 bg-muted/50 rounded-lg'>
                <h4 className='font-medium text-sm mb-3'>사용된 CSS Variables:</h4>
                <div className='grid gap-2 text-xs font-mono'>
                  <div><span className='text-blue-600'>--cell-size:</span> --spacing(8) = 32px (셀 크기)</div>
                  <div><span className='text-green-600'>--radix-select-content-available-height:</span> 선택 가능한 최대 높이</div>
                  <div><span className='text-purple-600'>--radix-select-trigger-width:</span> 트리거 너비</div>
                  <div><span className='text-orange-600'>--background:</span> 배경색 CSS Variable</div>
                  <div><span className='text-cyan-600'>--primary:</span> 주 색상</div>
                  <div><span className='text-pink-600'>--accent:</span> 강조 색상</div>
                  <div><span className='text-red-600'>--ring:</span> 포커스 링 색상</div>
                  <div><span className='text-amber-600'>--muted-foreground:</span> 비활성 텍스트 색상</div>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </Main>
    </>
  )
}
