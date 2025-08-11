import { createFileRoute } from '@tanstack/react-router'
import { Main } from '@/components/layout/main'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { useState, useMemo } from 'react'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  Download,
  Eye,
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react'

export const Route = createFileRoute('/_authenticated/table-showcase')({
  component: () => <TableShowcase />,
})

// Mock data for examples
interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: Date
  department: string
}

const mockUsers: User[] = [
  {
    id: '1',
    name: '김철수',
    email: 'kim@company.com',
    role: '관리자',
    status: 'active',
    lastLogin: new Date('2024-01-15'),
    department: '개발팀'
  },
  {
    id: '2',
    name: '이영희',
    email: 'lee@company.com',
    role: '개발자',
    status: 'pending',
    lastLogin: new Date('2024-01-14'),
    department: '개발팀'
  },
  {
    id: '3',
    name: '박민수',
    email: 'park@company.com',
    role: '디자이너',
    status: 'active',
    lastLogin: new Date('2024-01-13'),
    department: '디자인팀'
  }
]

const statusConfig = {
  active: {
    label: '활성',
    icon: CheckCircle,
    color: 'text-green-500',
  },
  pending: {
    label: '대기',
    icon: Clock,
    color: 'text-yellow-500',
  },
  inactive: {
    label: '비활성',
    icon: AlertCircle,
    color: 'text-gray-500',
  }
}

function TableShowcase() {
  return (
    <Main>
      <div className='space-y-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>DataTable 디자인 시스템</h1>
          <p className='text-muted-foreground mt-2'>
            피그마 구현을 위한 완전한 컴포넌트 가이드 - 실제 코드 기반
          </p>
        </div>

        {/* 1단계: 기본 Building Blocks */}
        <BasicBuildingBlocks />

        <Separator />

        {/* 2단계: Table Components */}
        <TableComponents />

        <Separator />

        {/* 3단계: Feature Components */}
        <FeatureComponents />

        <Separator />

        {/* 4단계: Complete DataTable */}
        <CompleteDataTable />

        <Separator />

        {/* 5단계: 피그마 구현 가이드 */}
        <FigmaImplementationGuide />
      </div>
    </Main>
  )
}

// 1단계: 기본 Building Blocks
function BasicBuildingBlocks() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🧱 기본 Building Blocks
          <Badge variant='secondary'>가장 작은 단위부터</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>

        {/* TableCell 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>TableCell (td) - 기본 단위</h3>

          {/* 실제 코드 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 구현 코드</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/components/ui/table.tsx
function TableCell({ className, ...props }: React.ComponentProps<'td'>) {
 return (
   <td
     data-slot='table-cell'
     className={cn(
       'p-2 align-middle whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]',
       className
     )}
     {...props}
   />
 )
}`}
           </pre>
          </div>

          {/* 계산된 최종 CSS 값 */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-blue-800'>계산된 최종 CSS 값</h4>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-blue-100 px-2 py-1 rounded'>p-2</code>
                  <span className='text-sm'>→ padding: 8px</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-blue-100 px-2 py-1 rounded'>align-middle</code>
                  <span className='text-sm'>→ vertical-align: middle</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-blue-100 px-2 py-1 rounded'>whitespace-nowrap</code>
                  <span className='text-sm'>→ white-space: nowrap</span>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-red-100 px-2 py-1 rounded'>font-size</code>
                  <span className='text-sm'>→ 14px (상위 table.text-sm 상속)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-blue-100 px-2 py-1 rounded'>data-slot</code>
                  <span className='text-sm'>→ 'table-cell'</span>
                </div>
              </div>
            </div>
          </div>

          {/* 시각적 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>시각적 예시</h4>

            {/* 기본 셀 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>1. 기본 텍스트 셀</h5>
              <div className='border rounded overflow-hidden'>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>김철수 (14px, 8px padding)</TableCell>
                      <TableCell>kim@company.com</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* 체크박스 셀 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>2. 체크박스 셀 ([&amp;:has([role=checkbox])]:pr-0 적용)</h5>
              <div className='border rounded overflow-hidden'>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <Checkbox className="translate-y-[2px]" />
                      </TableCell>
                      <TableCell>일반 셀 (우측 패딩 유지)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* 아이콘 버튼 셀 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>3. 액션 버튼 셀</h5>
              <div className='border rounded overflow-hidden'>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell>사용자 정보</TableCell>
                      <TableCell>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Props 인터페이스 */}
          <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>Props 인터페이스</h4>
            <pre className='text-sm'>
{`interface TableCellProps extends React.ComponentProps<'td'> {
 className?: string;
 // 추가 props는 ...props로 전달됨
}

// 사용 예시
<TableCell className="text-center font-medium">
 커스텀 스타일 적용
</TableCell>`}
           </pre>
          </div>
        </div>

        <Separator />

        {/* TableHead 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>TableHead (th) - 헤더 셀</h3>

          {/* 실제 코드 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 구현 코드</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/components/ui/table.tsx
function TableHead({ className, ...props }: React.ComponentProps<'th'>) {
 return (
   <th
     data-slot='table-head'
     className={cn(
       'text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&amp;:has([role=checkbox])]:pr-0 [&amp;&gt;[role=checkbox]]:translate-y-[2px]',
       className
     )}
     {...props}
   />
 )
}`}
           </pre>
          </div>

          {/* 계산된 최종 CSS 값 */}
          <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-purple-800'>계산된 최종 CSS 값</h4>
            <div className='grid gap-3 md:grid-cols-2'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-purple-100 px-2 py-1 rounded'>text-foreground</code>
                  <span className='text-sm'>→ color: var(--foreground)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-purple-100 px-2 py-1 rounded'>h-10</code>
                  <span className='text-sm'>→ height: 40px</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-purple-100 px-2 py-1 rounded'>px-2</code>
                  <span className='text-sm'>→ padding-left/right: 8px</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-purple-100 px-2 py-1 rounded'>font-medium</code>
                  <span className='text-sm'>→ font-weight: 500</span>
                </div>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-red-100 px-2 py-1 rounded'>font-size</code>
                  <span className='text-sm'>→ 14px (상위 table.text-sm 상속)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-purple-100 px-2 py-1 rounded'>text-left</code>
                  <span className='text-sm'>→ text-align: left</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-purple-100 px-2 py-1 rounded'>align-middle</code>
                  <span className='text-sm'>→ vertical-align: middle</span>
                </div>
              </div>
            </div>
          </div>

          {/* 시각적 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>시각적 예시</h4>

            {/* 일반 헤더 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>1. 일반 헤더 (정렬 불가)</h5>
              <div className='border rounded overflow-hidden'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름 (14px, 500 weight, 40px height)</TableHead>
                      <TableHead>이메일</TableHead>
                      <TableHead>부서</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
            </div>

            {/* 체크박스 헤더 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>2. 체크박스 헤더 ([&amp;:has([role=checkbox])]:pr-0 적용)</h5>
              <div className='border rounded overflow-hidden'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>
                        <Checkbox className="translate-y-[2px]" />
                      </TableHead>
                      <TableHead>전체 선택용 헤더</TableHead>
                    </TableRow>
                  </TableHeader>
                </Table>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* TableRow 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>TableRow (tr) - 행 컨테이너</h3>

          {/* 실제 코드 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 구현 코드</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/components/ui/table.tsx
function TableRow({ className, ...props }: React.ComponentProps<'tr'>) {
 return (
   <tr
     data-slot='table-row'
     className={cn(
       'hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors',
       className
     )}
     {...props}
   />
 )
}`}
           </pre>
          </div>

          {/* 계산된 최종 CSS 값 */}
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-green-800'>상태별 계산된 CSS 값</h4>
            <div className='space-y-3'>
              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>기본 상태</h5>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-green-100 px-2 py-1 rounded'>border-b</code>
                  <span className='text-sm'>→ border-bottom: 1px solid var(--border)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-green-100 px-2 py-1 rounded'>transition-colors</code>
                  <span className='text-sm'>→ transition: color, background-color, border-color</span>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>호버 상태</h5>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-green-100 px-2 py-1 rounded'>hover:bg-muted/50</code>
                  <span className='text-sm'>→ background-color: var(--muted) / 0.5</span>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>선택 상태 (data-state="selected")</h5>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-green-100 px-2 py-1 rounded'>data-[state=selected]:bg-muted</code>
                  <span className='text-sm'>→ background-color: var(--muted)</span>
                </div>
              </div>
            </div>
          </div>

          {/* 시각적 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>시각적 예시 - 상태별 변화</h4>

            <div className='bg-white border rounded-lg p-4'>
              <div className='border rounded overflow-hidden'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름</TableHead>
                      <TableHead>상태</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>기본 상태 행</TableCell>
                      <TableCell>일반</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableCell>호버 상태 시뮬레이션</TableCell>
                      <TableCell>호버</TableCell>
                    </TableRow>
                    <TableRow data-state="selected" className="bg-muted">
                      <TableCell>선택된 상태</TableCell>
                      <TableCell>선택됨</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* data-state 속성 설명 */}
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-yellow-800'>data-state 속성 사용법</h4>
            <pre className='text-sm'>
{`// JavaScript에서 선택 상태 설정
<TableRow data-state={isSelected ? 'selected' : undefined}>
 // 셀 내용
</TableRow>

// 또는 조건부 렌더링
<TableRow 
 className={isSelected ? 'bg-muted' : ''}
 data-state={isSelected ? 'selected' : undefined}
>
 // 셀 내용
</TableRow>`}
           </pre>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}

// 2단계: Table Components
function TableComponents() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🏗️ Table Components
          <Badge variant='secondary'>조합된 컴포넌트</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>

        {/* Table Container 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Container - 최상위 래퍼</h3>

          {/* 실제 코드 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 구현 코드</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/components/ui/table.tsx
function Table({ className, ...props }: React.ComponentProps<'table'>) {
 return (
   <div
     data-slot='table-container'
     className='relative w-full overflow-x-auto'
   >
     <table
       data-slot='table'
       className={cn('w-full caption-bottom text-sm', className)}
       {...props}
     />
   </div>
 )
}`}
           </pre>
          </div>

          {/* 중요한 상속 포인트 */}
          <div className='bg-red-50 border-2 border-red-300 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-red-800'>⭐ 핵심 상속 포인트</h4>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <code className='text-xs bg-red-100 px-2 py-1 rounded font-bold'>text-sm</code>
                <span className='text-sm font-medium'>→ 모든 하위 th, td 요소가 font-size: 14px로 상속받음</span>
              </div>
              <p className='text-sm text-red-700 mt-2'>
                이 클래스가 전체 테이블의 폰트 크기를 결정하는 가장 중요한 설정입니다.
              </p>
            </div>
          </div>

          {/* 컨테이너 구조 */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-blue-800'>컨테이너 구조</h4>
            <div className='space-y-3'>
              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>외부 컨테이너 (div)</h5>
                <div className='grid gap-2 md:grid-cols-3'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-blue-100 px-2 py-1 rounded'>relative</code>
                    <span className='text-sm'>position: relative</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-blue-100 px-2 py-1 rounded'>w-full</code>
                    <span className='text-sm'>width: 100%</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-blue-100 px-2 py-1 rounded'>overflow-x-auto</code>
                    <span className='text-sm'>overflow-x: auto</span>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>내부 테이블 (table)</h5>
                <div className='grid gap-2 md:grid-cols-3'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-blue-100 px-2 py-1 rounded'>w-full</code>
                    <span className='text-sm'>width: 100%</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-blue-100 px-2 py-1 rounded'>caption-bottom</code>
                    <span className='text-sm'>caption-side: bottom</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-red-100 px-2 py-1 rounded font-bold'>text-sm</code>
                    <span className='text-sm'>font-size: 14px</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 시각적 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>시각적 예시</h4>

            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>완전한 Table 구조</h5>
              <div className='border-2 border-blue-500 rounded overflow-hidden'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>이름 (14px)</TableHead>
                      <TableHead>이메일 (14px)</TableHead>
                      <TableHead>부서 (14px)</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>김철수 (14px)</TableCell>
                      <TableCell>kim@company.com (14px)</TableCell>
                      <TableCell>개발팀 (14px)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>이영희 (14px)</TableCell>
                      <TableCell>lee@company.com (14px)</TableCell>
                      <TableCell>디자인팀 (14px)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className='text-sm text-blue-600 mt-2'>
                → 파란색 테두리가 Table 컴포넌트의 경계, 모든 텍스트가 14px로 통일됨
              </p>
            </div>

            {/* 반응형 스크롤 시뮬레이션 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>반응형 스크롤 동작 (overflow-x-auto)</h5>
              <div className='border rounded overflow-hidden max-w-md'>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="min-w-32">이름</TableHead>
                      <TableHead className="min-w-48">긴 이메일 주소</TableHead>
                      <TableHead className="min-w-32">부서명</TableHead>
                      <TableHead className="min-w-32">역할</TableHead>
                      <TableHead className="min-w-32">상태</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>김철수</TableCell>
                      <TableCell>kim.chulsu@company.co.kr</TableCell>
                      <TableCell>개발팀</TableCell>
                      <TableCell>시니어</TableCell>
                      <TableCell>활성</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <p className='text-sm text-blue-600 mt-2'>
                → 컨테이너가 좁을 때 가로 스크롤이 자동으로 생성됨
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* TableHeader와 TableBody 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>TableHeader &amp; TableBody</h3>

          {/* 실제 코드 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 구현 코드</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/components/ui/table.tsx

// TableHeader (thead)
function TableHeader({ className, ...props }: React.ComponentProps<'thead'>) {
 return (
   <thead
     data-slot='table-header'
     className={cn('[&amp;_tr]:border-b', className)}
     {...props}
   />
 )
}

// TableBody (tbody)  
function TableBody({ className, ...props }: React.ComponentProps<'tbody'>) {
 return (
   <tbody
     data-slot='table-body'
     className={cn('[&amp;_tr:last-child]:border-0', className)}
     {...props}
   />
 )
}`}
           </pre>
          </div>

          {/* 선택자 분석 */}
          <div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-orange-800'>Tailwind 선택자 분석</h4>
            <div className='space-y-3'>
              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>TableHeader: [&_tr]:border-b</h5>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-orange-100 px-2 py-1 rounded'>[&_tr]:border-b</code>
                  <span className='text-sm'>→ thead 내 모든 tr 요소에 border-bottom 적용</span>
                </div>
                <p className='text-sm text-orange-700'>
                  CSS: thead tr &#123; border-bottom: 1px solid var(--border); &#125;
                </p>

              </div>
              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>TableBody: [&amp;_tr:last-child]:border-0</h5>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-orange-100 px-2 py-1 rounded'>[&amp;_tr:last-child]:border-0</code>
                  <span className='text-sm'>→ tbody 내 마지막 tr의 테두리 제거</span>
                </div>
                <p className='text-sm text-orange-700'>CSS: tbody tr:last-child  &#123; border: 0;  &#125;</p>
              </div>
            </div>
          </div>

          {/* 시각적 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>시각적 예시 - 테두리 동작</h4>

            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-2 text-green-700'>테두리 시스템 동작</h5>
              <div className='border rounded overflow-hidden'>
                <Table>
                  <TableHeader className="bg-muted/20">
                    <TableRow>
                      <TableHead>헤더 행 (하단 테두리 있음)</TableHead>
                      <TableHead>설명</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>첫 번째 행</TableCell>
                      <TableCell>하단 테두리 있음</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>두 번째 행</TableCell>
                      <TableCell>하단 테두리 있음</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>마지막 행</TableCell>
                      <TableCell>하단 테두리 없음 (last-child)</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className='mt-2 text-sm text-blue-600 space-y-1'>
                <div>→ 헤더: [&amp;_tr]:border-b로 하단 테두리 적용</div>
                <div>→ 본문: 기본적으로 모든 행에 테두리, 마지막 행만 제거</div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
// 3단계: Feature Components
function FeatureComponents() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
  const totalPages = Math.ceil(25 / pageSize) // 예시 데이터

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          ⚙️ Feature Components
          <Badge variant='secondary'>DataTable 기능 컴포넌트</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>

        {/* DataTableToolbar 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>DataTableToolbar - 검색 및 필터</h3>

          {/* 실제 코드 구조 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 Toolbar 구조</h4>
            <pre className='text-sm overflow-x-auto'>
{`// DataTable에서 사용되는 구조
<div className='space-y-4'>
 <DataTableToolbar table={table} />
 {/* 테이블 영역 */}
</div>

// Toolbar 기본 레이아웃
<div className='flex items-center justify-between'>
 <div className='flex flex-1 items-center space-x-2'>
   {/* 검색 및 필터 */}
 </div>
 <div className='flex items-center space-x-2'>
   {/* 액션 버튼들 */}
 </div>
</div>`}
           </pre>
          </div>

          {/* 실제 구현 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>실제 구현 예시</h4>

            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-3 text-green-700'>완전한 Toolbar</h5>

              {/* 실제 툴바 구현 */}
              <div className='flex items-center justify-between'>
                <div className='flex flex-1 items-center space-x-2'>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="사용자 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="h-8 w-[150px] lg:w-[250px] pl-8"
                    />
                  </div>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue placeholder="상태" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 상태</SelectItem>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="pending">대기</SelectItem>
                      <SelectItem value="inactive">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                  {(searchTerm || statusFilter !== 'all') && (
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setSearchTerm('')
                        setStatusFilter('all')
                      }}
                      className="h-8 px-2 lg:px-3"
                    >
                      리셋 ✕
                    </Button>
                  )}
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    내보내기
                  </Button>
                  <Button variant="outline" size="sm">
                    <Eye className="mr-2 h-4 w-4" />
                    컬럼
                  </Button>
                </div>
              </div>

              <div className='mt-3 text-sm text-blue-600 space-y-1'>
                <div>→ 좌측: flex-1으로 남은 공간 모두 차지</div>
                <div>→ space-x-2: 요소 간 8px 간격</div>
                <div>→ 모든 Input/Select/Button이 h-8(32px)로 높이 통일</div>
              </div>
            </div>

            {/* 검색 Input 상세 분석 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-3 text-green-700'>검색 Input 상세 분석</h5>

              <div className='space-y-3'>
                <div className='bg-gray-50 p-3 rounded'>
                  <h6 className='font-medium text-sm mb-2'>구조</h6>
                  <pre className='text-xs'>
{`<div className="relative">
 <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
 <Input className="h-8 w-[150px] lg:w-[250px] pl-8" />
</div>`}
                 </pre>
                </div>

                <div className='bg-blue-50 p-3 rounded'>
                  <h6 className='font-medium text-sm mb-2'>CSS 계산 값</h6>
                  <div className='grid gap-2 md:grid-cols-2 text-sm'>
                    <div><code>relative</code> → position: relative</div>
                    <div><code>absolute left-2 top-2.5</code> → left: 8px, top: 10px</div>
                    <div><code>h-4 w-4</code> → 16×16px 아이콘</div>
                    <div><code>h-8</code> → height: 32px</div>
                    <div><code>w-[150px]</code> → width: 150px (기본)</div>
                    <div><code>lg:w-[250px]</code> → width: 250px (1024px 이상)</div>
                    <div><code>pl-8</code> → padding-left: 32px (아이콘 공간)</div>
                  </div>
                </div>

                <div className='border rounded p-2'>
                  <div className="relative max-w-xs">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="실제 동작 예시"
                      className="h-8 w-full pl-8"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 반응형 동작 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-3 text-green-700'>반응형 동작</h5>

              <div className='grid gap-4 md:grid-cols-2'>
                <div>
                  <h6 className='font-medium text-sm mb-2'>모바일 (&lt; 1024px)</h6>
                  <div className='border rounded p-3 max-w-sm'>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-1 items-center space-x-2'>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="검색" className="h-8 w-[150px] pl-8" />
                        </div>
                        <Select>
                          <SelectTrigger className="h-8 w-[100px]">
                            <SelectValue placeholder="필터" />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2 ml-2">
                        <Button variant="outline" size="sm">액션</Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h6 className='font-medium text-sm mb-2'>데스크톱 (≥ 1024px)</h6>
                  <div className='border rounded p-3'>
                    <div className='flex items-center justify-between'>
                      <div className='flex flex-1 items-center space-x-2'>
                        <div className="relative">
                          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                          <Input placeholder="검색" className="h-8 w-[250px] pl-8" />
                        </div>
                        <Select>
                          <SelectTrigger className="h-8 w-[100px]">
                            <SelectValue placeholder="필터" />
                          </SelectTrigger>
                        </Select>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">내보내기</Button>
                        <Button variant="outline" size="sm">컬럼</Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* DataTablePagination 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>DataTablePagination - 페이지 네비게이션</h3>

          {/* 실제 코드 구조 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 구현 코드</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/features/tasks/components/data-table-pagination.tsx
export function DataTablePagination<TData>({ table }: DataTablePaginationProps<TData>) {
 return (
   <div
     className='flex items-center justify-between overflow-clip px-2'
     style={{ overflowClipMargin: 1 }}
   >
     <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
       {table.getFilteredSelectedRowModel().rows.length} of{' '}
       {table.getFilteredRowModel().rows.length} row(s) selected.
     </div>
     <div className='flex items-center sm:space-x-6 lg:space-x-8'>
       {/* 페이지 크기 선택 */}
       <div className='flex items-center space-x-2'>
         <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
         <Select onValueChange={(value) => table.setPageSize(Number(value))}>
           <SelectTrigger className='h-8 w-[70px]'>
             <SelectValue />
           </SelectTrigger>
           <SelectContent side='top'>
             {[10, 20, 30, 40, 50].map((pageSize) => (
               <SelectItem key={pageSize} value={\`\${pageSize}\`}>
                 {pageSize}
               </SelectItem>
             ))}
           </SelectContent>
         </Select>
       </div>
       
       {/* 페이지 정보 */}
       <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
         Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
       </div>
       
       {/* 네비게이션 버튼 */}
       <div className='flex items-center space-x-2'>
         <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex' 
                 onClick={() => table.setPageIndex(0)}>
           <DoubleArrowLeftIcon className='h-4 w-4' />
         </Button>
         <Button variant='outline' className='h-8 w-8 p-0' 
                 onClick={() => table.previousPage()}>
           <ChevronLeftIcon className='h-4 w-4' />
         </Button>
         <Button variant='outline' className='h-8 w-8 p-0' 
                 onClick={() => table.nextPage()}>
           <ChevronRightIcon className='h-4 w-4' />
         </Button>
         <Button variant='outline' className='hidden h-8 w-8 p-0 lg:flex'
                 onClick={() => table.setPageIndex(table.getPageCount() - 1)}>
           <DoubleArrowRightIcon className='h-4 w-4' />
         </Button>
       </div>
     </div>
   </div>
 )
}`}
           </pre>
          </div>

          {/* CSS 분석 */}
          <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-purple-800'>레이아웃 CSS 분석</h4>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>최상위 컨테이너</h5>
                <div className='grid gap-2 md:grid-cols-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>overflow-clip px-2</code>
                    <span className='text-sm'>overflow: clip, padding: 0 8px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>overflowClipMargin: 1</code>
                    <span className='text-sm'>인라인 스타일로 설정</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>flex items-center justify-between</code>
                    <span className='text-sm'>양쪽 끝 정렬</span>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>반응형 간격</h5>
                <div className='grid gap-2 md:grid-cols-3'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>space-x-2</code>
                    <span className='text-sm'>기본 8px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>sm:space-x-6</code>
                    <span className='text-sm'>≥640px: 24px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>lg:space-x-8</code>
                    <span className='text-sm'>≥1024px: 32px</span>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>버튼 크기</h5>
                <div className='grid gap-2 md:grid-cols-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>h-8 w-8 p-0</code>
                    <span className='text-sm'>32×32px, 패딩 제거</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-purple-100 px-2 py-1 rounded'>hidden lg:flex</code>
                    <span className='text-sm'>대형 화면에서만 표시</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 실제 구현 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>실제 구현 예시</h4>

            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-3 text-green-700'>완전한 Pagination</h5>

              {/* 실제 페이지네이션 구현 */}
              <div
                className='flex items-center justify-between overflow-clip px-2'
                style={{ overflowClipMargin: 1 }}
              >
                <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
                  3 of 25 row(s) selected.
                </div>
                <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                  <div className='flex items-center space-x-2'>
                    <p className='hidden text-sm font-medium sm:block'>Rows per page</p>
                    <Select value={pageSize.toString()} onValueChange={(value) => setPageSize(Number(value))}>
                      <SelectTrigger className='h-8 w-[70px]'>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side='top'>
                        {[5, 10, 20, 30, 50].map((size) => (
                          <SelectItem key={size} value={size.toString()}>
                            {size}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='flex w-[100px] items-center justify-center text-sm font-medium'>
                    Page {currentPage} of {totalPages}
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Button
                      variant='outline'
                      className='hidden h-8 w-8 p-0 lg:flex'
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(1)}
                    >
                      <span className='sr-only'>Go to first page</span>
                      ««
                    </Button>
                    <Button
                      variant='outline'
                      className='h-8 w-8 p-0'
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                    >
                      <span className='sr-only'>Go to previous page</span>
                      «
                    </Button>
                    <Button
                      variant='outline'
                      className='h-8 w-8 p-0'
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                    >
                      <span className='sr-only'>Go to next page</span>
                      »
                    </Button>
                    <Button
                      variant='outline'
                      className='hidden h-8 w-8 p-0 lg:flex'
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      <span className='sr-only'>Go to last page</span>
                      »»
                    </Button>
                  </div>
                </div>
              </div>

              <div className='mt-3 text-sm text-blue-600 space-y-1'>
                <div>→ 좌측 정보: hidden sm:block으로 모바일에서 숨김</div>
                <div>→ 버튼: h-8 w-8 p-0으로 32×32px 정사각형</div>
                <div>→ 첫/마지막 버튼: hidden lg:flex로 큰 화면에서만 표시</div>
              </div>
            </div>

            {/* 반응형 동작 시뮬레이션 */}
            <div className='bg-white border rounded-lg p-4'>
              <h5 className='font-medium mb-3 text-green-700'>반응형 동작</h5>

              <div className='space-y-4'>
                <div>
                  <h6 className='font-medium text-sm mb-2'>모바일 (640px 미만)</h6>
                  <div className='border rounded p-3 max-w-sm'>
                    <div className='flex items-center justify-end space-x-2'>
                      <Select defaultValue="10">
                        <SelectTrigger className='h-8 w-[70px]'>
                          <SelectValue />
                        </SelectTrigger>
                      </Select>
                      <div className='text-sm font-medium'>1/5</div>
                      <Button variant='outline' className='h-8 w-8 p-0' disabled>«</Button>
                      <Button variant='outline' className='h-8 w-8 p-0'>»</Button>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 mt-1'>선택 정보와 라벨 숨김, 간격 축소</p>
                </div>

                <div>
                  <h6 className='font-medium text-sm mb-2'>데스크톱 (1024px 이상)</h6>
                  <div className='border rounded p-3'>
                    <div className='flex items-center justify-between'>
                      <div className='text-sm text-muted-foreground flex-1'>3 of 25 row(s) selected.</div>
                      <div className='flex items-center space-x-8'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-sm font-medium'>Rows per page</span>
                          <Select defaultValue="10">
                            <SelectTrigger className='h-8 w-[70px]'>
                              <SelectValue />
                            </SelectTrigger>
                          </Select>
                        </div>
                        <div className='text-sm font-medium'>Page 1 of 5</div>
                        <div className='flex items-center space-x-2'>
                          <Button variant='outline' className='h-8 w-8 p-0'>««</Button>
                          <Button variant='outline' className='h-8 w-8 p-0' disabled>«</Button>
                          <Button variant='outline' className='h-8 w-8 p-0'>»</Button>
                          <Button variant='outline' className='h-8 w-8 p-0'>»»</Button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className='text-sm text-gray-600 mt-1'>모든 요소 표시, 넓은 간격</p>
                </div>
              </div>
            </div>
          </div>

          {/* @tanstack/react-table 연동 */}
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-yellow-800'>@tanstack/react-table 연동</h4>
            <pre className='text-sm'>
{`// 실제 사용되는 table 메서드들
table.getFilteredSelectedRowModel().rows.length  // 선택된 행 수
table.getFilteredRowModel().rows.length         // 전체 행 수
table.getState().pagination.pageSize            // 현재 페이지 크기
table.getState().pagination.pageIndex + 1       // 현재 페이지 (1부터 시작)
table.getPageCount()                            // 전체 페이지 수
table.setPageSize(Number(value))                // 페이지 크기 변경
table.setPageIndex(0)                          // 첫 페이지로
table.previousPage()                           // 이전 페이지
table.nextPage()                              // 다음 페이지`}
           </pre>
          </div>
        </div>

        <Separator />

        {/* DataTableColumnHeader 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>DataTableColumnHeader - 정렬 가능한 헤더</h3>

          {/* 실제 코드 구조 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 구현 코드</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/features/tasks/components/data-table-column-header.tsx
export function DataTableColumnHeader<TData, TValue>({
 column,
 title,
 className,
}: DataTableColumnHeaderProps<TData, TValue>) {
 if (!column.getCanSort()) {
   return <div className={cn(className)}>{title}</div>
 }

 return (
   <div className={cn('flex items-center space-x-2', className)}>
     <DropdownMenu>
       <DropdownMenuTrigger asChild>
         <Button
           variant='ghost'
           size='sm'
           className='data-[state=open]:bg-accent -ml-3 h-8'
         >
           <span>{title}</span>
           {column.getIsSorted() === 'desc' ? (
             <ArrowDownIcon className='ml-2 h-4 w-4' />
           ) : column.getIsSorted() === 'asc' ? (
             <ArrowUpIcon className='ml-2 h-4 w-4' />
           ) : (
             <CaretSortIcon className='ml-2 h-4 w-4' />
           )}
         </Button>
       </DropdownMenuTrigger>
       <DropdownMenuContent align='start'>
         <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
           <ArrowUpIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
           Asc
         </DropdownMenuItem>
         <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
           <ArrowDownIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
           Desc
         </DropdownMenuItem>
         {column.getCanHide() && (
           <>
             <DropdownMenuSeparator />
             <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
               <EyeNoneIcon className='text-muted-foreground/70 mr-2 h-3.5 w-3.5' />
               Hide
             </DropdownMenuItem>
           </>
         )}
       </DropdownMenuContent>
     </DropdownMenu>
   </div>
 )
}`}
           </pre>
          </div>

          {/* Button variant 분석 */}
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-green-800'>Button variant="ghost" 분석</h4>

            <div className='space-y-3'>
              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>실제 Button 컴포넌트 variant 정의</h5>
                <pre className='text-xs'>
{`// src/components/ui/button.tsx
ghost: 'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50'`}
               </pre>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>적용된 클래스들</h5>
                <div className='grid gap-2 md:grid-cols-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-green-100 px-2 py-1 rounded'>variant='ghost'</code>
                    <span className='text-sm'>투명 배경, 호버시 accent</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-green-100 px-2 py-1 rounded'>size='sm'</code>
                    <span className='text-sm'>h-8 px-3 (32px 높이)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-green-100 px-2 py-1 rounded'>-ml-3</code>
                    <span className='text-sm'>margin-left: -12px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-green-100 px-2 py-1 rounded'>h-8</code>
                    <span className='text-sm'>height: 32px (size='sm' override)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-green-100 px-2 py-1 rounded'>data-[state=open]:bg-accent</code>
                    <span className='text-sm'>드롭다운 열림시 accent 배경</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 시각적 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>시각적 예시 - 정렬 상태별</h4>

              <div className='bg-white border rounded-lg p-4'>
                <div className='border rounded overflow-hidden'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <div className='flex items-center space-x-2'>
                            <Button variant='ghost' size='sm' className='-ml-3 h-8'>
                              <span>이름</span>
                              <ChevronsUpDown className='ml-2 h-4 w-4' />
                            </Button>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className='flex items-center space-x-2'>
                            <Button variant='ghost' size='sm' className='-ml-3 h-8 bg-accent'>
                              <span>상태</span>
                              <ChevronUp className='ml-2 h-4 w-4' />
                            </Button>
                          </div>
                        </TableHead>
                        <TableHead>
                          <div className='flex items-center space-x-2'>
                            <Button variant='ghost' size='sm' className='-ml-3 h-8'>
                              <span>생성일</span>
                              <ChevronDown className='ml-2 h-4 w-4' />
                            </Button>
                          </div>
                        </TableHead>
                        <TableHead>이메일</TableHead>
                      </TableRow>
                    </TableHeader>
                  </Table>
                </div>
                <div className='mt-3 text-sm text-blue-600 space-y-1'>
                  <div>→ 첫 번째: 정렬 안됨 (ChevronsUpDown 아이콘)</div>
                  <div>→ 두 번째: 오름차순 정렬 (ChevronUp, bg-accent 활성)</div>
                  <div>→ 세 번째: 내림차순 정렬 (ChevronDown)</div>
                  <div>→ 네 번째: 정렬 불가능한 일반 헤더</div>
                </div>
              </div>

              {/* 아이콘 크기 분석 */}
              <div className='bg-white border rounded-lg p-4'>
                <h5 className='font-medium mb-3 text-green-700'>아이콘 크기 시스템</h5>

                <div className='space-y-3'>
                  <div className='grid gap-4 md:grid-cols-3'>
                    <div className='text-center'>
                      <div className='border rounded p-3 inline-block'>
                        <ChevronsUpDown className='h-4 w-4' />
                      </div>
                      <p className='text-sm mt-1'>h-4 w-4 (16×16px)</p>
                      <p className='text-xs text-gray-600'>헤더 버튼 아이콘</p>
                    </div>
                    <div className='text-center'>
                      <div className='border rounded p-3 inline-block'>
                        <ChevronUp className='h-3.5 w-3.5' />
                      </div>
                      <p className='text-sm mt-1'>h-3.5 w-3.5 (14×14px)</p>
                      <p className='text-xs text-gray-600'>드롭다운 메뉴 아이콘</p>
                    </div>
                    <div className='text-center'>
                      <div className='border rounded p-3 inline-block'>
                        <MoreHorizontal className='h-4 w-4' />
                      </div>
                      <p className='text-sm mt-1'>h-4 w-4 (16×16px)</p>
                      <p className='text-xs text-gray-600'>액션 버튼 아이콘</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Props 인터페이스 */}
            <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
              <h4 className='font-medium mb-3'>Props 인터페이스 &amp; 사용법</h4>
              <pre className='text-sm'>
{`interface DataTableColumnHeaderProps<TData, TValue>
 extends React.HTMLAttributes<HTMLDivElement> {
 column: Column<TData, TValue>  // @tanstack/react-table Column 객체
 title: string                  // 헤더에 표시될 텍스트
}

// 사용 예시
const columns: ColumnDef<User>[] = [
   {
     accessorKey: "name",
     header: ({ column }) => (
       <DataTableColumnHeader column={column} title="이름" />
     ),
   },
   {
     accessorKey: "email",
     header: "이메일", // 정렬 불가능한 일반 헤더
   },
 ]

// column.getCanSort() 메서드로 정렬 가능 여부 확인
// column.getIsSorted() 메서드로 현재 정렬 상태 확인 ('asc' | 'desc' | false)`}
           </pre>
            </div>
          </div>

      </CardContent>
    </Card>
)
}


function CompleteDataTable() {
  const [data, setData] = useState<User[]>(mockUsers)
  const [selectedRows, setSelectedRows] = useState<Set<string>>(new Set())
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(5)
// 필터링 및 정렬된 데이터
  const processedData = useMemo(() => {
    let filtered = data.filter(user => {
      const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || user.status === statusFilter
      return matchesSearch && matchesStatus
    })
    if (sortColumn) {
      filtered.sort((a, b) => {
        let aVal = a[sortColumn]
        let bVal = b[sortColumn]

        if (aVal instanceof Date) aVal = aVal.getTime()
        if (bVal instanceof Date) bVal = bVal.getTime()

        if (aVal < bVal) return sortDirection === 'asc' ? -1 : 1
        if (aVal > bVal) return sortDirection === 'asc' ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, statusFilter, sortColumn, sortDirection])
// 페이지네이션
  const totalPages = Math.ceil(processedData.length / pageSize)
  const paginatedData = processedData.slice((currentPage - 1) * pageSize, currentPage * pageSize)
  const handleSort = (column: keyof User) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }
  const toggleRowSelection = (id: string) => {
    const newSelected = new Set(selectedRows)
    if (newSelected.has(id)) {
      newSelected.delete(id)
    } else {
      newSelected.add(id)
    }
    setSelectedRows(newSelected)
  }
  const toggleAllSelection = () => {
    if (selectedRows.size === paginatedData.length) {
      setSelectedRows(new Set())
    } else {
      setSelectedRows(new Set(paginatedData.map(user => user.id)))
    }
  }
  const getSortIcon = (column: keyof User) => {
    if (sortColumn !== column) return <ChevronsUpDown className="h-4 w-4" />
    return sortDirection === 'asc' ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🚀 Complete DataTable
          <Badge variant='secondary'>최종 완성품</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>
        {/* 전체 구조 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>전체 DataTable 구조</h3>

          {/* 실제 DataTable 구조 */}
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <h4 className='font-medium mb-2'>실제 DataTable 구조 (완전한 구현)</h4>
            <pre className='text-sm overflow-x-auto'>
{`// src/features/tasks/components/data-table.tsx
export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {
const [rowSelection, setRowSelection] = React.useState({})
const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
const [sorting, setSorting] = React.useState<SortingState>([])
const table = useReactTable({
data, columns,
state: { sorting, columnVisibility, rowSelection, columnFilters },
enableRowSelection: true,
onRowSelectionChange: setRowSelection,
onSortingChange: setSorting,
onColumnFiltersChange: setColumnFilters,
onColumnVisibilityChange: setColumnVisibility,
getCoreRowModel: getCoreRowModel(),
getFilteredRowModel: getFilteredRowModel(),
getPaginationRowModel: getPaginationRowModel(),
getSortedRowModel: getSortedRowModel(),
getFacetedRowModel: getFacetedRowModel(),
getFacetedUniqueValues: getFacetedUniqueValues(),
})
return (
<div className='space-y-4'>
<DataTableToolbar table={table} />
<div className='overflow-hidden rounded-md border'>
<Table>
<TableHeader>
{table.getHeaderGroups().map((headerGroup) => (
<TableRow key={headerGroup.id}>
{headerGroup.headers.map((header) => (
<TableHead key={header.id} colSpan={header.colSpan}>
{header.isPlaceholder ? null : flexRender(
header.column.columnDef.header,
header.getContext()
)}
</TableHead>
))}
</TableRow>
))}
</TableHeader>
<TableBody>
{table.getRowModel().rows?.length ? (
table.getRowModel().rows.map((row) => (
<TableRow
key={row.id}
data-state={row.getIsSelected() && 'selected'}
>
{row.getVisibleCells().map((cell) => (
<TableCell key={cell.id}>
{flexRender(cell.column.columnDef.cell, cell.getContext())}
</TableCell>
))}
</TableRow>
))
) : (
<TableRow>
<TableCell colSpan={columns.length} className='h-24 text-center'>
No results.
</TableCell>
</TableRow>
)}
</TableBody>
</Table>
</div>
<DataTablePagination table={table} />
</div>
)
}`}
</pre>
          </div>
          {/* 중요한 래퍼 구조 */}
          <div className='bg-red-50 border-2 border-red-300 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-red-800'>⭐ 중요한 래퍼 구조</h4>
            <div className='space-y-3'>
              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>최상위 컨테이너</h5>
                <code className='text-sm'>div className='space-y-4'</code>
                <p className='text-xs text-gray-600 mt-1'>Toolbar, Table, Pagination 간 16px 간격</p>
              </div>

              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>테이블 래퍼 (현재 문서에서 누락되었던 부분)</h5>
                <code className='text-sm'>div className='overflow-hidden rounded-md border'</code>
                <p className='text-xs text-gray-600 mt-1'>테이블을 감싸는 카드 스타일 래퍼</p>
              </div>

              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>Table 컴포넌트</h5>
                <code className='text-sm'>Table (내부적으로 div + table 구조)</code>
                <p className='text-xs text-gray-600 mt-1'>relative w-full overflow-x-auto + table.text-sm</p>
              </div>
            </div>
          </div>

          {/* 완전한 DataTable 예시 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>완전한 DataTable 실제 동작 예시</h4>

            <div className='bg-white border-2 border-green-500 rounded-lg p-4'>
              <h5 className='font-medium mb-3 text-green-700'>실제 동작하는 완전한 DataTable</h5>

              {/* 완전한 DataTable 구현 */}
              <div className='space-y-4'>
                {/* Toolbar */}
                <div className='flex items-center justify-between'>
                  <div className='flex flex-1 items-center space-x-2'>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="사용자 검색..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="h-8 w-[150px] lg:w-[250px] pl-8"
                      />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue placeholder="상태" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 상태</SelectItem>
                        <SelectItem value="active">활성</SelectItem>
                        <SelectItem value="pending">대기</SelectItem>
                        <SelectItem value="inactive">비활성</SelectItem>
                      </SelectContent>
                    </Select>
                    {(searchTerm || statusFilter !== 'all') && (
                      <Button
                        variant="ghost"
                        onClick={() => {
                          setSearchTerm('')
                          setStatusFilter('all')
                        }}
                        className="h-8 px-2 lg:px-3"
                      >
                        리셋 ✕
                      </Button>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Download className="mr-2 h-4 w-4" />
                      내보내기
                    </Button>
                    <Button variant="outline" size="sm">
                      <Eye className="mr-2 h-4 w-4" />
                      컬럼
                    </Button>
                  </div>
                </div>

                {/* Table with wrapper */}
                <div className='overflow-hidden rounded-md border'>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>
                          <Checkbox
                            checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                            onCheckedChange={toggleAllSelection}
                            className="translate-y-[2px]"
                          />
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                            onClick={() => handleSort('name')}
                          >
                            <span>이름</span>
                            {getSortIcon('name')}
                          </Button>
                        </TableHead>
                        <TableHead>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="-ml-3 h-8 data-[state=open]:bg-accent"
                            onClick={() => handleSort('status')}
                          >
                            <span>상태</span>
                            {getSortIcon('status')}
                          </Button>
                        </TableHead>
                        <TableHead>역할</TableHead>
                        <TableHead>이메일</TableHead>
                        <TableHead></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {paginatedData.map((user) => {
                        const status = statusConfig[user.status]
                        const StatusIcon = status.icon
                        const isSelected = selectedRows.has(user.id)

                        return (
                          <TableRow
                            key={user.id}
                            className={isSelected ? 'bg-muted' : ''}
                            data-state={isSelected ? 'selected' : undefined}
                          >
                            <TableCell>
                              <Checkbox
                                checked={isSelected}
                                onCheckedChange={() => toggleRowSelection(user.id)}
                                className="translate-y-[2px]"
                              />
                            </TableCell>
                            <TableCell>
                              <div className="flex space-x-2">
                                <Badge variant="outline">{user.department}</Badge>
                                <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                              {user.name}
                            </span>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex w-[100px] items-center">
                                <StatusIcon className={`mr-2 h-4 w-4 ${status.color}`} />
                                <span>{status.label}</span>
                              </div>
                            </TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>
                              <Button variant="ghost" size="icon" className="h-8 w-8">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>

                {/* Pagination */}
                <div
                  className='flex items-center justify-between overflow-clip px-2'
                  style={{ overflowClipMargin: 1 }}
                >
                  <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
                    {selectedRows.size} / {processedData.length} 행이 선택됨
                  </div>
                  <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                    <div className="flex items-center space-x-2">
                      <p className="hidden text-sm font-medium sm:block">페이지당 행 수</p>
                      <Select
                        value={`${pageSize}`}
                        onValueChange={(value) => {
                          setPageSize(Number(value))
                          setCurrentPage(1)
                        }}
                      >
                        <SelectTrigger className="h-8 w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent side="top">
                          {[3, 5, 10, 20].map((size) => (
                            <SelectItem key={size} value={`${size}`}>
                              {size}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                      {currentPage} / {totalPages || 1} 페이지
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setCurrentPage(1)}
                        disabled={currentPage === 1}
                      >
                        <span className="sr-only">Go to first page</span>
                        ««
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                        disabled={currentPage === 1}
                      >
                        <span className="sr-only">Go to previous page</span>
                        «
                      </Button>
                      <Button
                        variant="outline"
                        className="h-8 w-8 p-0"
                        onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                        disabled={currentPage === totalPages}
                      >
                        <span className="sr-only">Go to next page</span>
                        »
                      </Button>
                      <Button
                        variant="outline"
                        className="hidden h-8 w-8 p-0 lg:flex"
                        onClick={() => setCurrentPage(totalPages)}
                        disabled={currentPage === totalPages}
                      >
                        <span className="sr-only">Go to last page</span>
                        »»
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

              <div className='mt-4 p-3 bg-green-100 rounded'>
                <h6 className='font-medium text-green-800 mb-2'>구조 분석</h6>
                <div className='text-sm text-green-700 space-y-1'>
                  <div>1. space-y-4: Toolbar ↔ Table ↔ Pagination 간 16px 간격</div>
                  <div>2. overflow-hidden rounded-md border: 테이블 카드 래퍼</div>
                  <div>3. Table 컴포넌트: relative w-full overflow-x-auto + table.text-sm</div>
                  <div>4. 모든 텍스트가 14px로 통일 (table.text-sm 상속)</div>
                  <div>5. 실제 상태 관리와 데이터 처리 로직 포함</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* @tanstack/react-table 통합 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>@tanstack/react-table 통합</h3>

          {/* flexRender 시스템 */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-blue-800'>flexRender 시스템</h4>
            <pre className='text-sm overflow-x-auto'>
{`// 헤더 렌더링
{table.getHeaderGroups().map((headerGroup) => (
<TableRow key={headerGroup.id}>
{headerGroup.headers.map((header) => (
<TableHead key={header.id} colSpan={header.colSpan}>
{header.isPlaceholder ? null : flexRender(
header.column.columnDef.header,  // 헤더 정의
header.getContext()              // 컨텍스트 (column, table 정보)
)}
</TableHead>
))}
</TableRow>
))}
// 셀 렌더링
{table.getRowModel().rows.map((row) => (
<TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
{row.getVisibleCells().map((cell) => (
<TableCell key={cell.id}>
{flexRender(
cell.column.columnDef.cell,  // 셀 정의
cell.getContext()            // 컨텍스트 (row, column, table 정보)
)}
</TableCell>
))}
</TableRow>
))}`}
</pre>
          </div>
          {/* 상태 관리 */}
          <div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-orange-800'>상태 관리 시스템</h4>
            <pre className='text-sm overflow-x-auto'>
{`const [rowSelection, setRowSelection] = React.useState({})
const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
const [sorting, setSorting] = React.useState<SortingState>([])
const table = useReactTable({
data,
columns,
state: {
sorting,           // 정렬 상태
columnVisibility,  // 컬럼 표시/숨김 상태
rowSelection,      // 행 선택 상태
columnFilters,     // 필터 상태
},
enableRowSelection: true,
onRowSelectionChange: setRowSelection,
onSortingChange: setSorting,
onColumnFiltersChange: setColumnFilters,
onColumnVisibilityChange: setColumnVisibility,
getCoreRowModel: getCoreRowModel(),
getFilteredRowModel: getFilteredRowModel(),
getPaginationRowModel: getPaginationRowModel(),
getSortedRowModel: getSortedRowModel(),
getFacetedRowModel: getFacetedRowModel(),
getFacetedUniqueValues재시도J계속편집(): getFacetedUniqueValues(),
})`}
</pre>
          </div>
          {/* 컬럼 정의 예시 */}
          <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-purple-800'>컬럼 정의 예시</h4>
            <pre className="text-sm overflow-x-auto">
{String.raw`const columns: ColumnDef<User>[] = [
// 체크박스 컬럼
{
  id: "select",
  header: ({ table }) => (
    <Checkbox
      checked={table.getIsAllPageRowsSelected()}
      onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
      className="translate-y-[2px]"
    />
  ),
  cell: ({ row }) => (
    <Checkbox
      checked={row.getIsSelected()}
      onCheckedChange={(value) => row.toggleSelected(!!value)}
      className="translate-y-[2px]"
    />
  ),
  enableSorting: false,
  enableHiding: false,
},
// 정렬 가능한 컬럼
{
  accessorKey: "name",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="이름" />
  ),
  cell: ({ row }) => {
    const name = row.getValue("name") as string
    return (
      <div className="flex space-x-2">
        <Badge variant="outline">{row.original.department}</Badge>
        <span className="max-w-32 truncate font-medium">{name}</span>
      </div>
    )
  },
},
// 상태 컬럼 (커스텀 렌더링)
{
  accessorKey: "status",
  header: ({ column }) => (
    <DataTableColumnHeader column={column} title="상태" />
  ),
  cell: ({ row }) => {
    const status = row.getValue("status") as keyof typeof statusConfig
    const config = statusConfig[status]
    const Icon = config.icon
    return (
      <div className="flex w-[100px] items-center">
        <Icon className={\`mr-2 h-4 w-4 \${config.color}\`} />
        <span>{config.label}</span>
      </div>
    )
  },
  filterFn: (row, id, value) => {
    return value.includes(row.getValue(id))
  },
},
// 일반 텍스트 컬럼
{
  accessorKey: "email",
  header: "이메일",
  cell: ({ row }) => row.getValue("email"),
},
// 액션 컬럼
{
  id: "actions",
  cell: ({ row }) => (
    <Button variant="ghost" size="icon" className="h-8 w-8">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  ),
},
]`}
</pre>

          </div>
        </div>
      </CardContent>
    </Card>
  )
}
// 5단계: 피그마 구현 가이드
function FigmaImplementationGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🎨 피그마 구현 가이드
          <Badge variant='secondary'>CSS → 피그마 매핑</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>
        {/* CSS 값 → 피그마 토큰 매핑 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>CSS 값 → 피그마 프로퍼티 매핑</h3>

          {/* 스페이싱 시스템 */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-blue-800'>스페이싱 시스템</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>CSS 클래스 → 픽셀 값</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <code className='bg-blue-100 px-2 py-1 rounded'>p-2</code>
                    <span>→ 8px</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-blue-100 px-2 py-1 rounded'>px-2</code>
                    <span>→ left/right: 8px</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-blue-100 px-2 py-1 rounded'>space-x-2</code>
                    <span>→ gap: 8px</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-blue-100 px-2 py-1 rounded'>space-y-4</code>
                    <span>→ gap: 16px</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-blue-100 px-2 py-1 rounded'>sm:space-x-6</code>
                    <span>→ ≥640px: 24px</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-blue-100 px-2 py-1 rounded'>lg:space-x-8</code>
                    <span>→ ≥1024px: 32px</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>피그마 Auto Layout 설정</h5>
                <div className='space-y-2 text-sm'>
                  <div>• <strong>padding:</strong> 8px (p-2)</div>
                  <div>• <strong>item spacing:</strong> 8px (space-x-2)</div>
                  <div>• <strong>direction:</strong> horizontal/vertical</div>
                  <div>• <strong>alignment:</strong> center (items-center)</div>
                  <div>• <strong>distribution:</strong> space between (justify-between)</div>
                  <div>• <strong>responsive:</strong> 변형으로 브레이크포인트별 설정</div>
                </div>
              </div>
            </div>
          </div>

          {/* 크기 시스템 */}
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-green-800'>크기 시스템</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>높이 (Height)</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>h-8</code>
                    <span>→ 32px (Input, Button)</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>h-10</code>
                    <span>→ 40px (TableHead)</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>h-4 w-4</code>
                    <span>→ 16×16px (아이콘)</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>h-3.5 w-3.5</code>
                    <span>→ 14×14px (작은 아이콘)</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>너비 (Width)</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>w-full</code>
                    <span>→ fill container</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>w-[150px]</code>
                    <span>→ fixed 150px</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>w-[70px]</code>
                    <span>→ fixed 70px (Select)</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-green-100 px-2 py-1 rounded'>flex-1</code>
                    <span>→ fill available space</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 타이포그래피 시스템 */}
          <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-purple-800'>타이포그래피 시스템</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>CSS → 피그마 텍스트 스타일</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex justify-between'>
                    <code className='bg-purple-100 px-2 py-1 rounded'>text-sm</code>
                    <span>→ 14px (모든 테이블 텍스트)</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-purple-100 px-2 py-1 rounded'>font-medium</code>
                    <span>→ weight: 500 (헤더)</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-purple-100 px-2 py-1 rounded'>text-left</code>
                    <span>→ align: left</span>
                  </div>
                  <div className='flex justify-between'>
                    <code className='bg-purple-100 px-2 py-1 rounded'>whitespace-nowrap</code>
                    <span>→ 줄바꿈 없음</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>피그마 텍스트 프로퍼티</h5>
                <div className='space-y-2 text-sm'>
                  <div>• <strong>Font:</strong> Inter (--font-inter)</div>
                  <div>• <strong>Size:</strong> 14px</div>
                  <div>• <strong>Weight:</strong> 500 (Medium) / 400 (Regular)</div>
                  <div>• <strong>Line height:</strong> Auto</div>
                  <div>• <strong>Align:</strong> Left</div>
                  <div>• <strong>Vertical align:</strong> Center</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 컴포넌트 계층 구조 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>피그마 컴포넌트 계층 구조</h3>

          {/* 마스터 컴포넌트 구조 */}
          <div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-orange-800'>마스터 컴포넌트 구조</h4>
            <pre className='text-sm'>
{`📦 DataTable (마스터 컴포넌트)
├── 🧱 TableCell
│   ├── Property: type = "text" | "checkbox" | "action" | "status"
│   ├── Property: content = text
│   └── Variants: 각 타입별 레이아웃
├── 🧱 TableHead
│   ├── Property: sortable = boolean
│   ├── Property: title = text
│   └── Variants: sortable true/false
├── 🧱 TableRow
│   ├── Property: state = "default" | "hover" | "selected"
│   └── Instance swap: 각 셀 타입
├── 📋 Table
│   ├── Property: showHeader = boolean
│   └── Instance swap: Header + Body 조합
├── ⚙️ DataTableToolbar
│   ├── Property: hasSearch = boolean
│   ├── Property: hasFilter = boolean
│   └── Instance swap: 각 컨트롤 요소
├── 📄 DataTablePagination
│   ├── Property: currentPage = number
│   ├── Property: totalPages = number
│   └── Responsive variants: mobile/desktop
└── 🚀 Complete DataTable
    └── Instance swap: Toolbar + Table + Pagination`}
</pre>


          </div>
          {/* Variant 시스템 설계 */}
          <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-yellow-800'>Variant 시스템 설계</h4>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>TableCell Variants</h5>
                <div className='grid gap-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <code className='bg-yellow-100 px-2 py-1 rounded'>Type</code>
                    <span>text | checkbox | action | status | badge</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-yellow-100 px-2 py-1 rounded'>State</code>
                    <span>default | selected</span>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>Button Variants (정렬 헤더)</h5>
                <div className='grid gap-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <code className='bg-yellow-100 px-2 py-1 rounded'>Variant</code>
                    <span>ghost | outline</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-yellow-100 px-2 py-1 rounded'>Size</code>
                    <span>sm | icon</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-yellow-100 px-2 py-1 rounded'>Sort State</code>
                    <span>none | asc | desc</span>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>Pagination Variants</h5>
                <div className='grid gap-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <code className='bg-yellow-100 px-2 py-1 rounded'>Breakpoint</code>
                    <span>mobile | tablet | desktop</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-yellow-100 px-2 py-1 rounded'>Button State</code>
                    <span>enabled | disabled</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 상태 및 인터랙션 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>상태 및 인터랙션 설계</h3>

          {/* 상호작용 상태 */}
          <div className='bg-red-50 border border-red-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-red-800'>상호작용 상태 매핑</h4>

            <div className='space-y-4'>
              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>TableRow 상태</h5>
                <div className='grid gap-3 md:grid-cols-3'>
                  <div className='bg-white p-3 rounded border'>
                    <h6 className='font-medium text-xs mb-1'>Default</h6>
                    <div className='text-xs'>CSS: border-b</div>
                    <div className='text-xs'>피그마: border bottom 1px</div>
                  </div>
                  <div className='bg-white p-3 rounded border'>
                    <h6 className='font-medium text-xs mb-1'>Hover</h6>
                    <div className='text-xs'>CSS: hover:bg-muted/50</div>
                    <div className='text-xs'>피그마: fill var(--muted) 50%</div>
                  </div>
                  <div className='bg-white p-3 rounded border'>
                    <h6 className='font-medium text-xs mb-1'>Selected</h6>
                    <div className='text-xs'>CSS: data-[state=selected]:bg-muted</div>
                    <div className='text-xs'>피그마: fill var(--muted) 100%</div>
                  </div>
                </div>
              </div>

              <div className='space-y-2'>
                <h5 className='font-medium text-sm'>Button 상태 (정렬 헤더)</h5>
                <div className='grid gap-3 md:grid-cols-3'>
                  <div className='bg-white p-3 rounded border'>
                    <h6 className='font-medium text-xs mb-1'>Default</h6>
                    <div className='text-xs'>CSS: variant="ghost"</div>
                    <div className='text-xs'>피그마: transparent background</div>
                  </div>
                  <div className='bg-white p-3 rounded border'>
                    <h6 className='font-medium text-xs mb-1'>Hover</h6>
                    <div className='text-xs'>CSS: hover:bg-accent</div>
                    <div className='text-xs'>피그마: fill var(--accent)</div>
                  </div>
                  <div className='bg-white p-3 rounded border'>
                    <h6 className='font-medium text-xs mb-1'>Active/Open</h6>
                    <div className='text-xs'>CSS: data-[state=open]:bg-accent</div>
                    <div className='text-xs'>피그마: fill var(--accent)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 애니메이션 설정 */}
          <div className='bg-indigo-50 border border-indigo-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-indigo-800'>애니메이션 설정</h4>

            <div className='space-y-3'>
              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>transition-colors</h5>
                <div className='text-sm space-y-1'>
                  <div><strong>CSS:</strong> transition: color, background-color, border-color</div>
                  <div><strong>Duration:</strong> 150ms</div>
                  <div><strong>Easing:</strong> cubic-bezier(0.4, 0, 0.2, 1)</div>
                  <div><strong>피그마:</strong> Smart Animate 150ms ease-out</div>
                </div>
              </div>

              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>적용 요소</h5>
                <div className='text-sm space-y-1'>
                  <div>• TableRow hover/selected 상태 변화</div>
                  <div>• Button hover/active 상태 변화</div>
                  <div>• DropdownMenu 표시/숨김</div>
                  <div>• Select 열림/닫힘</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 반응형 설계 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>반응형 설계 가이드</h3>

          {/* 브레이크포인트 시스템 */}
          <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>브레이크포인트 매핑</h4>

            <div className='grid gap-4 md:grid-cols-3'>
              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>Mobile (&lt; 640px)</h5>
                <div className='text-xs space-y-1'>
                  <div>• 검색창: w-[150px]</div>
                  <div>• 선택 정보: hidden</div>
                  <div>• 페이지 라벨: hidden</div>
                  <div>• 첫/마지막 버튼: hidden</div>
                  <div>• 간격: space-x-2</div>
                </div>
              </div>

              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>Tablet (640px+)</h5>
                <div className='text-xs space-y-1'>
                  <div>• 선택 정보: sm:block</div>
                  <div>• 페이지 라벨: sm:block</div>
                  <div>• 간격: sm:space-x-6</div>
                  <div>• 검색창: 여전히 150px</div>
                </div>
              </div>

              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>Desktop (1024px+)</h5>
                <div className='text-xs space-y-1'>
                  <div>• 검색창: lg:w-[250px]</div>
                  <div>• 첫/마지막 버튼: lg:flex</div>
                  <div>• 간격: lg:space-x-8</div>
                  <div>• 모든 요소 표시</div>
                </div>
              </div>
            </div>
          </div>

          {/* 피그마 반응형 구현 */}
          <div className='bg-teal-50 border border-teal-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-teal-800'>피그마 반응형 구현 방법</h4>

            <div className='space-y-3'>
              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>1. 컴포넌트 변형 생성</h5>
                <div className='text-sm space-y-1'>
                  <div>• DataTable/Mobile (최대 640px)</div>
                  <div>• DataTable/Tablet (640px-1024px)</div>
                  <div>• DataTable/Desktop (1024px+)</div>
                </div>
              </div>

              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>2. Auto Layout 설정</h5>
                <div className='text-sm space-y-1'>
                  <div>• Mobile: item spacing 8px</div>
                  <div>• Tablet: item spacing 24px</div>
                  <div>• Desktop: item spacing 32px</div>
                </div>
              </div>

              <div className='bg-white p-3 rounded border'>
                <h5 className='font-medium text-sm mb-2'>3. 요소 표시/숨김</h5>
                <div className='text-sm space-y-1'>
                  <div>• Mobile: 특정 레이어 visible false</div>
                  <div>• Desktop: 모든 레이어 visible true</div>
                  <div>• 조건부 표시는 Boolean property로 제어</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 최종 체크리스트 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>피그마 구현 체크리스트</h3>

          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-green-800'>구현 완료 체크리스트</h4>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>기본 컴포넌트</h5>
                <div className='space-y-1 text-sm'>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    TableCell (4가지 타입 variant)
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    TableHead (정렬 가능/불가능)
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    TableRow (3가지 상태)
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    Table Container 구조
                  </label>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>기능 컴포넌트</h5>
                <div className='space-y-1 text-sm'>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    DataTableToolbar (검색/필터)
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    DataTablePagination (3가지 크기)
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    DataTableColumnHeader (정렬)
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox   />
                    Complete DataTable 조합
                  </label>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>스타일 시스템</h5>
                <div className='space-y-1 text-sm'>
                  <label className='flex items-center gap-2'>
                    <Checkbox  />
                    14px 텍스트 스타일 적용
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox  />
                    8px 기본 패딩/간격 적용
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox  />
                    32px 높이 컨트롤 통일
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox  />
                    hover/selected 상태 구현
                  </label>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>반응형 &amp; 인터랙션</h5>
                <div className='space-y-1 text-sm'>
                  <label className='flex items-center gap-2'>
                    <Checkbox  />
                    3가지 브레이크포인트 변형
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox />
                    요소 표시/숨김 로직
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox/>
                    Smart Animate 150ms 설정
                  </label>
                  <label className='flex items-center gap-2'>
                    <Checkbox  />
                    Property 기반 상태 제어
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>

      </CardContent>
    </Card>
  )
}
export default TableShowcase