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
import { useState, useMemo } from 'react'
import {
  ChevronDown,
  ChevronUp,
  ChevronsUpDown,
  MoreHorizontal,
  Search,
  Filter,
  Download,
  Eye,
  Settings,
  Loader2,
  AlertCircle,
  CheckCircle,
  Clock,
  User
} from 'lucide-react'


export const Route = createFileRoute('/_authenticated/table-showcase')({
  component: () => <TableShowcase />,
})

// 실제 데이터 타입 정의
interface User {
  id: string
  name: string
  email: string
  role: string
  status: 'active' | 'inactive' | 'pending'
  lastLogin: Date
  department: string
}

// 목업 데이터
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
  },
  {
    id: '4',
    name: '정지혜',
    email: 'jung@company.com',
    role: '기획자',
    status: 'inactive',
    lastLogin: new Date('2024-01-10'),
    department: '기획팀'
  },
  {
    id: '5',
    name: '최동훈',
    email: 'choi@company.com',
    role: '개발자',
    status: 'active',
    lastLogin: new Date('2024-01-16'),
    department: '개발팀'
  }
]

// 상태 아이콘 매핑
const statusConfig = {
  active: {
    label: '활성',
    icon: CheckCircle,
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    borderColor: 'border-green-200'
  },
  pending: {
    label: '대기',
    icon: Clock,
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200'
  },
  inactive: {
    label: '비활성',
    icon: AlertCircle,
    color: 'text-gray-500',
    bgColor: 'bg-gray-50',
    borderColor: 'border-gray-200'
  }
}

function TableShowcase() {
  return (
    <Main>
      <div className='space-y-8'>
        <div>
          <h1 className='text-3xl font-bold tracking-tight'>테이블 디자인 시스템</h1>
          <p className='text-muted-foreground mt-2'>
            실제 동작하는 DataTable 컴포넌트 구현 가이드 - 라이브 데모 포함
          </p>
        </div>

        {/* 1단계: 기반 구조 - 실제 동작하는 DataTable */}
        <LiveDataTableDemo />


        <CSSAnalysisSection />

      <ComponentBreakdownSection />
<FigmaDesignGuide />
        {/* 4단계: 반응형 및 디자인 토큰 */}
        <ResponsiveDesignSection />


        <SummarySection />
      </div>
    </Main>
  )
}

// 1단계: 실제 동작하는 DataTable (기준이 되는 완성된 테이블)
function LiveDataTableDemo() {
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
          📊 실제 구현된 DataTable
          <Badge variant='secondary'>기준 테이블</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h4 className='font-medium'>완전한 기능을 가진 DataTable</h4>
          <p className='text-muted-foreground'>
            모든 스타일과 동작이 실제로 구현된 기준 테이블입니다.
          </p>

          {/* 실제 구현된 DataTable */}
          <div className='space-y-4'>
            {/* Toolbar - 실제 구현된 스타일 */}
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

            {/* Table - 실제 UI 컴포넌트 기준 */}
            <div className='relative w-full overflow-x-auto'>
              <div className='overflow-hidden rounded-md border'>
                <table className='w-full caption-bottom text-sm'>
                  <thead className='[&_tr]:border-b'>
                  <tr>
                    <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                      <Checkbox
                        checked={selectedRows.size === paginatedData.length && paginatedData.length > 0}
                        onCheckedChange={toggleAllSelection}
                        className="translate-y-[2px]"
                      />
                    </th>
                    <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => handleSort('name')}
                      >
                        <span>이름</span>
                        {getSortIcon('name')}
                      </Button>
                    </th>
                    <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => handleSort('status')}
                      >
                        <span>상태</span>
                        {getSortIcon('status')}
                      </Button>
                    </th>
                    <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                        onClick={() => handleSort('role')}
                      >
                        <span>역할</span>
                        {getSortIcon('role')}
                      </Button>
                    </th>
                    <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>이메일</th>
                    <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'></th>
                  </tr>
                  </thead>
                  <tbody className='[&_tr:last-child]:border-0'>
                  {paginatedData.map((user) => {
                    const status = statusConfig[user.status]
                    const StatusIcon = status.icon
                    const isSelected = selectedRows.has(user.id)

                    return (
                      <tr
                        key={user.id}
                        className={`hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors ${
                          isSelected ? 'bg-muted' : ''
                        }`}
                        data-state={isSelected ? 'selected' : undefined}
                      >
                        <td className='p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                          <Checkbox
                            checked={isSelected}
                            onCheckedChange={() => toggleRowSelection(user.id)}
                            className="translate-y-[2px]"
                          />
                        </td>
                        <td className='p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                          <div className="flex space-x-2">
                            <Badge variant="outline">{user.department}</Badge>
                            <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
                                {user.name}
                              </span>
                          </div>
                        </td>
                        <td className='p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                          <div className="flex w-[100px] items-center">
                            <StatusIcon className={`mr-2 h-4 w-4 ${status.color}`} />
                            <span>{status.label}</span>
                          </div>
                        </td>
                        <td className='p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>{user.role}</td>
                        <td className='p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>{user.email}</td>
                        <td className='p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </td>
                      </tr>
                    )
                  })}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pagination - 실제 구현된 스타일 */}
            <div className='flex items-center justify-between overflow-clip px-2' style={{ overflowClipMargin: 1 }}>
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
                      {[5, 10, 20, 30, 40, 50].map((size) => (
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
        </div>
      </CardContent>
    </Card>
  )
}

// 2단계: CSS 스타일링 상세 분석 (상속받는 모든 클래스 포함)
function CSSAnalysisSection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🎨 CSS 스타일링 상세 분석
          <Badge variant='secondary'>상속 관계 포함 완전 분석</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>

        {/* Table Container 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Container</h3>
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <code className='text-sm'>{'<div className="relative w-full overflow-x-auto">'}</code>
          </div>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시</h4>
            <div className='relative w-full overflow-x-auto bg-gray-50 border rounded p-2'>
              <div className='min-w-[600px] text-sm text-gray-600'>
                넓은 콘텐츠 - 화면이 좁을 때 가로 스크롤 표시됨 (창 크기를 줄여보세요)
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>relative</code>
                  <span className='text-sm text-muted-foreground'>position: relative</span>
                </div>
                <p className='text-xs text-muted-foreground'>하위 절대 위치 요소의 기준점 역할</p>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>w-full</code>
                  <span className='text-sm text-muted-foreground'>width: 100%</span>
                </div>
                <p className='text-xs text-muted-foreground'>부모 요소의 전체 너비 사용</p>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>overflow-x-auto</code>
                  <span className='text-sm text-muted-foreground'>overflow-x: auto</span>
                </div>
                <p className='text-xs text-muted-foreground'>가로 스크롤 필요시 자동 표시</p>
              </div>
            </div>

            <h4 className='font-medium text-sm'>상위에서 상속받는 스타일</h4>
            <div className='bg-yellow-50 border border-yellow-200 rounded p-3'>
              <p className='text-sm text-yellow-700'>
                • Main 컴포넌트의 폰트 설정 상속<br />
                • 전역 CSS의 * 선택자 영향: border-border, outline-ring/50<br />
                • body의 bg-background, text-foreground 상속
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Table Element 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Element</h3>
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <code className='text-sm'>{'<table className="w-full caption-bottom text-sm">'}</code>
          </div>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시</h4>
            <div className='border rounded overflow-hidden'>
              <table className='w-full caption-bottom text-sm'>
                <caption className='text-muted-foreground mt-4 text-sm'>사용자 정보 테이블</caption>
                <thead className='bg-muted/20'>
                <tr>
                  <th className='h-10 px-2 text-left font-medium'>이름</th>
                  <th className='h-10 px-2 text-left font-medium'>이메일</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className='p-2'>김철수</td>
                  <td className='p-2'>kim@example.com</td>
                </tr>
                </tbody>
              </table>
            </div>
            <p className='text-sm text-blue-600 mt-2'>→ text-sm이 모든 하위 요소(thead, tbody, th, td)에 상속됨</p>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>w-full</code>
                  <span className='text-sm text-muted-foreground'>width: 100%</span>
                </div>
                <p className='text-xs text-muted-foreground'>컨테이너 전체 너비 사용</p>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>caption-bottom</code>
                  <span className='text-sm text-muted-foreground'>caption-side: bottom</span>
                </div>
                <p className='text-xs text-muted-foreground'>캡션을 테이블 하단에 배치</p>
              </div>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-red-100 px-2 py-1 rounded'>text-sm</code>
                  <span className='text-sm text-muted-foreground'>font-size: 0.875rem (14px)</span>
                </div>
                <p className='text-xs text-muted-foreground'>⭐ 모든 하위 요소에 상속되는 핵심 클래스</p>
              </div>
            </div>

            <h4 className='font-medium text-sm'>상위에서 상속받는 스타일</h4>
            <div className='bg-yellow-50 border border-yellow-200 rounded p-3'>
              <p className='text-sm text-yellow-700'>
                • Container의 relative, w-full, overflow-x-auto 영향<br />
                • 전역 CSS의 테이블 기본 스타일 적용<br />
                • body의 색상 시스템 상속
              </p>
            </div>

            <h4 className='font-medium text-sm'>하위 요소에 미치는 영향</h4>
            <div className='bg-blue-50 border border-blue-200 rounded p-3'>
              <p className='text-sm text-blue-700'>
                • <strong>text-sm</strong>이 thead, tbody, th, td, caption 모든 하위 요소의 기본 폰트 크기가 됨<br />
                • w-full이 테이블 전체 너비 결정<br />
                • caption-bottom이 caption 요소 위치 결정
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Table Header 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Header (thead)</h3>
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <code className='text-sm'>{'<thead className="[&_tr]:border-b">'}</code>
          </div>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시</h4>
            <div className='border rounded overflow-hidden'>
              <table className='w-full text-sm'>
                <thead className='[&_tr]:border-b bg-muted/20'>
                <tr>
                  <th className='h-10 px-2 text-left align-middle font-medium'>헤더 1 (14px)</th>
                  <th className='h-10 px-2 text-left align-middle font-medium'>헤더 2 (14px)</th>
                  <th className='h-10 px-2 text-left align-middle font-medium'>헤더 3 (14px)</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                  <td className='p-2'>데이터 1 (14px)</td>
                  <td className='p-2'>데이터 2 (14px)</td>
                  <td className='p-2'>데이터 3 (14px)</td>
                </tr>
                </tbody>
              </table>
            </div>
            <p className='text-sm text-blue-600 mt-2'>→ 상위 table의 text-sm으로 인해 모든 텍스트가 14px</p>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <code className='text-xs bg-blue-100 px-2 py-1 rounded'>[&_tr]:border-b</code>
                <span className='text-sm text-muted-foreground'>하위 모든 tr 요소에 border-bottom 적용</span>
              </div>
              <p className='text-sm text-muted-foreground'>
                <strong>CSS 선택자:</strong> <code>&</code>는 현재 요소(thead)를 의미하며,
                모든 하위 tr 요소에 <code>border-bottom: 1px solid var(--border)</code> 적용
              </p>
            </div>

            <h4 className='font-medium text-sm'>상위에서 상속받는 스타일</h4>
            <div className='bg-red-50 border border-red-200 rounded p-3'>
              <p className='text-sm text-red-700'>
                <strong>⭐ 핵심 상속:</strong><br />
                • <strong>table의 text-sm</strong> → font-size: 14px (가장 중요!)<br />
                • table의 w-full → thead 너비 결정<br />
                • Container의 relative → 절대 위치 기준점<br />
                • 전역 CSS의 border-border → 테두리 색상
              </p>
            </div>

            <h4 className='font-medium text-sm'>하위 요소(tr, th)에 미치는 영향</h4>
            <div className='bg-blue-50 border border-blue-200 rounded p-3'>
              <p className='text-sm text-blue-700'>
                • <strong>[&_tr]:border-b</strong>가 모든 tr 요소의 하단 테두리 결정<br />
                • <strong>text-sm 상속</strong>이 모든 th 요소의 폰트 크기를 14px로 설정<br />
                • thead 자체에는 폰트 크기 선언이 없지만 상위 table에서 상속
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Table Head Cell 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Head Cell (th)</h3>
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <code className='text-sm break-all'>
              {'<th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">'}
            </code>
          </div>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div>
                <p className='text-sm font-medium mb-2'>일반 헤더 셀 (14px 폰트)</p>
                <div className='border rounded overflow-hidden'>
                  <table className='w-full text-sm'>
                    <thead className='bg-muted/20'>
                    <tr>
                      <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap'>
                        이메일 주소 (14px)
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
              </div>
              <div>
                <p className='text-sm font-medium mb-2'>체크박스 포함 헤더 셀</p>
                <div className='border rounded overflow-hidden'>
                  <table className='w-full text-sm'>
                    <thead className='bg-muted/20'>
                    <tr>
                      <th className='text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                        <Checkbox className="translate-y-[2px]" />
                      </th>
                    </tr>
                    </thead>
                  </table>
                </div>
              </div>
            </div>
            <p className='text-sm text-blue-600 mt-2'>→ 체크박스가 있는 경우 우측 패딩 제거 및 체크박스 위치 조정</p>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>기본 스타일</h5>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>text-foreground</code>
                    <span className='text-sm text-muted-foreground'>color: var(--foreground)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>h-10</code>
                    <span className='text-sm text-muted-foreground'>height: 2.5rem (40px)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>px-2</code>
                    <span className='text-sm text-muted-foreground'>padding-left/right: 0.5rem (8px)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>text-left</code>
                    <span className='text-sm text-muted-foreground'>text-align: left</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>align-middle</code>
                    <span className='text-sm text-muted-foreground'>vertical-align: middle</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>font-medium</code>
                    <span className='text-sm text-muted-foreground'>font-weight: 500</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>whitespace-nowrap</code>
                    <span className='text-sm text-muted-foreground'>white-space: nowrap</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>체크박스 관련 스타일</h5>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-blue-100 px-2 py-1 rounded'>[&:has([role=checkbox])]:pr-0</code>
                    <span className='text-sm text-muted-foreground'>체크박스 포함 시 우측 패딩 제거</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                      [&amp;&gt;[role=checkbox]]:translate-y-[2px]
                    </code>

                    <span className='text-sm text-muted-foreground'>직속 체크박스 2px 아래로 이동</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className='font-medium text-sm'>상위에서 상속받는 스타일 (실제 적용되는 최종 스타일)</h4>
            <div className='bg-red-50 border border-red-200 rounded p-3'>
              <p className='text-sm text-red-700'>
                <strong>⭐ 최종 계산된 스타일:</strong><br />
                • <strong>font-size: 14px</strong> (table의 text-sm에서 상속 - th에는 직접 폰트 크기 선언 없음!)<br />
                • <strong>font-weight: 500</strong> (직접 선언된 font-medium)<br />
                • <strong>color: var(--foreground)</strong> (직접 선언된 text-foreground)<br />
                • <strong>height: 40px</strong> (직접 선언된 h-10)<br />
                • <strong>padding: 0 8px</strong> (직접 선언된 px-2)<br />
                • <strong>border-bottom: 1px solid var(--border)</strong> (thead의 [&_tr]:border-b에서 상속)
              </p>
            </div>

            <div className='bg-orange-50 border border-orange-200 rounded p-3'>
              <p className='text-sm text-orange-700'>
                <strong>⚠️ 중요한 상속 관계:</strong><br />
                • th 요소 자체에는 <strong>폰트 크기가 직접 선언되지 않음</strong><br />
                • 상위 table 요소의 <strong>text-sm</strong>이 CSS cascade를 통해 상속됨<br />
                • 이것이 모든 th와 td가 14px 폰트를 갖는 이유
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Table Body 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Body (tbody)</h3>
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <code className='text-sm'>{'<tbody className="[&_tr:last-child]:border-0">'}</code>
          </div>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시</h4>
            <div className='border rounded overflow-hidden'>
              <table className='w-full text-sm'>
                <thead className='bg-muted/20 [&_tr]:border-b'>
                <tr>
                  <th className='h-10 px-2 text-left font-medium'>이름 (14px)</th>
                  <th className='h-10 px-2 text-left font-medium'>상태 (14px)</th>
                </tr>
                </thead>
                <tbody className='[&_tr:last-child]:border-0'>
                <tr className='border-b'>
                  <td className='p-2'>김철수 (14px)</td>
                  <td className='p-2'>활성 (14px)</td>
                </tr>
                <tr className='border-b'>
                  <td className='p-2'>이영희 (14px)</td>
                  <td className='p-2'>대기 (14px)</td>
                </tr>
                <tr className='border-0'>
                  <td className='p-2'>박민수 (14px) - 마지막 행</td>
                  <td className='p-2'>비활성 (14px)</td>
                </tr>
                </tbody>
              </table>
            </div>
            <p className='text-sm text-blue-600 mt-2'>→ 마지막 행의 테두리가 제거되어 깔끔한 마무리, 모든 텍스트는 table의 text-sm 상속으로 14px</p>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <code className='text-xs bg-blue-100 px-2 py-1 rounded'>[&_tr:last-child]:border-0</code>
                <span className='text-sm text-muted-foreground'>마지막 행의 테두리 제거</span>
              </div>
              <p className='text-sm text-muted-foreground'>
                <strong>CSS 선택자 설명:</strong> 마지막 tr 요소의 border를 0으로 설정하여
                테이블 하단에 불필요한 테두리가 표시되지 않도록 함
              </p>
            </div>

            <h4 className='font-medium text-sm'>상위에서 상속받는 스타일</h4>
            <div className='bg-red-50 border border-red-200 rounded p-3'>
              <p className='text-sm text-red-700'>
                <strong>⭐ 핵심 상속:</strong><br />
                • <strong>table의 text-sm</strong> → 모든 하위 td 요소가 font-size: 14px<br />
                • table의 w-full → tbody 너비 결정<br />
                • Container의 relative → 절대 위치 기준점<br />
                • 전역 CSS 영향
              </p>
            </div>

            <h4 className='font-medium text-sm'>하위 요소(tr, td)에 미치는 영향</h4>
            <div className='bg-blue-50 border border-blue-200 rounded p-3'>
              <p className='text-sm text-blue-700'>
                • <strong>[&_tr:last-child]:border-0</strong>이 마지막 tr의 테두리 제거<br />
                • <strong>text-sm 상속</strong>이 모든 td 요소를 14px 폰트로 설정<br />
                • tbody 자체에는 폰트나 색상 선언이 없지만 모두 상위에서 상속
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Table Row 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Row (tr)</h3>
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <code className='text-sm break-all'>
              {'<tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">'}
            </code>
          </div>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시 (모든 텍스트 14px)</h4>
            <div className='border rounded overflow-hidden'>
              <table className='w-full text-sm'>
                <thead className='bg-muted/20 [&_tr]:border-b'>
                <tr>
                  <th className='h-10 px-2 text-left font-medium'>이름</th>
                  <th className='h-10 px-2 text-left font-medium'>상태</th>
                </tr>
                </thead>
                <tbody>
                <tr className='border-b transition-colors'>
                  <td className='p-2'>김철수 (14px)</td>
                  <td className='p-2'>일반 상태 (14px)</td>
                </tr>
                <tr className='hover:bg-muted/50 border-b transition-colors bg-muted/30'>
                  <td className='p-2'>이영희 (14px)</td>
                  <td className='p-2'>호버 상태 (14px)</td>
                </tr>
                <tr className='bg-muted border-b transition-colors'>
                  <td className='p-2'>박민수 (14px)</td>
                  <td className='p-2'>선택된 상태 (14px)</td>
                </tr>
                </tbody>
              </table>
            </div>
            <div className='mt-2 text-sm text-blue-600 space-y-1'>
              <div>→ 첫 번째: 일반 상태 (기본)</div>
              <div>→ 두 번째: 호버 상태 시뮬레이션</div>
              <div>→ 세 번째: 선택된 상태 시뮬레이션</div>
              <div>→ 모든 텍스트: table의 text-sm에서 상속받은 14px</div>
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>hover:bg-muted/50</code>
                  <span className='text-sm text-muted-foreground'>호버 시 배경색 50% 투명도</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>data-[state=selected]:bg-muted</code>
                  <span className='text-sm text-muted-foreground'>선택 상태 시 배경색</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>border-b</code>
                  <span className='text-sm text-muted-foreground'>하단 테두리</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>transition-colors</code>
                  <span className='text-sm text-muted-foreground'>색상 변화 애니메이션</span>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>상태별 시각적 표현</h5>
                <div className='space-y-2'>
                  <div className='h-8 border-b flex items-center px-2 text-sm'>일반 상태 (14px)</div>
                  <div className='h-8 border-b flex items-center px-2 text-sm bg-muted/50'>호버 상태 (14px)</div>
                  <div className='h-8 border-b flex items-center px-2 text-sm bg-muted'>선택된 상태 (14px)</div>
                </div>
              </div>
            </div>

            <h4 className='font-medium text-sm'>상위에서 상속받는 스타일</h4>
            <div className='bg-red-50 border border-red-200 rounded p-3'>
              <p className='text-sm text-red-700'>
                <strong>⭐ 핵심 상속:</strong><br />
                • <strong>table의 text-sm</strong> → tr 내 모든 td가 font-size: 14px<br />
                • tbody의 [&_tr:last-child]:border-0 → 마지막 tr의 border-b가 override됨<br />
                • table의 w-full → tr 너비 결정<br />
                • 전역 border-border → 테두리 색상 결정
              </p>
            </div>

            <h4 className='font-medium text-sm'>하위 요소(td)에 미치는 영향</h4>
            <div className='bg-blue-50 border border-blue-200 rounded p-3'>
              <p className='text-sm text-blue-700'>
                • <strong>text-sm 상속</strong>이 모든 td 요소의 기본 폰트 크기를 14px로 설정<br />
                • hover 및 selected 배경색이 전체 행에 적용<br />
                • transition-colors가 td 내 요소들의 색상 변화도 부드럽게 처리
              </p>
            </div>
          </div>

          <div className='bg-blue-50 border border-blue-200 rounded p-3'>
            <p className='text-sm text-blue-700'>
              <strong>Data Attributes:</strong> <code>data-[state=selected]</code>는 HTML data 속성을
              이용한 Tailwind의 조건부 스타일링입니다. JavaScript에서 <code>data-state="selected"</code>
              속성을 추가하면 해당 스타일이 적용됩니다.
            </p>
          </div>
        </div>

        <Separator />

        {/* Table Cell 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Table Cell (td)</h3>
          <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
            <code className='text-sm break-all'>
              {'<td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">'}
            </code>
          </div>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시 (모든 텍스트 14px)</h4>
            <div className='grid gap-4 md:grid-cols-3'>
              <div>
                <p className='text-sm font-medium mb-2'>일반 셀 (14px)</p>
                <div className='border rounded overflow-hidden'>
                  <table className='w-full text-sm'>
                    <tbody>
                    <tr>
                      <td className='p-2 align-middle whitespace-nowrap'>김철수 (14px)</td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className='text-sm font-medium mb-2'>체크박스 셀</p>
                <div className='border rounded overflow-hidden'>
                  <table className='w-full text-sm'>
                    <tbody>
                    <tr>
                      <td className='p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]'>
                        <Checkbox className="translate-y-[2px]" />
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div>
                <p className='text-sm font-medium mb-2'>긴 텍스트 셀 (14px)</p>
                <div className='border rounded overflow-hidden'>
                  <table className='w-full text-sm'>
                    <tbody>
                    <tr>
                      <td className='p-2 align-middle whitespace-nowrap max-w-32 truncate'>
                        매우 긴 텍스트가 잘림 처리됩니다 (14px)
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <p className='text-sm text-blue-600 mt-2'>→ 모든 td 텍스트는 상위 table의 text-sm(14px)을 상속받음</p>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>p-2</code>
                  <span className='text-sm text-muted-foreground'>padding: 0.5rem (8px)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>align-middle</code>
                  <span className='text-sm text-muted-foreground'>vertical-align: middle</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-muted px-2 py-1 rounded'>whitespace-nowrap</code>
                  <span className='text-sm text-muted-foreground'>white-space: nowrap</span>
                </div>
              </div>

              <div className='space-y-2'>
                <div className='flex items-center gap-2'>
                  <code className='text-xs bg-blue-100 px-2 py-1 rounded'>[&:has([role=checkbox])]:pr-0</code>
                  <span className='text-sm text-muted-foreground'>체크박스 포함 시 우측 패딩 제거</span>
                </div>
                <div className='flex items-center gap-2'>
                  <code className="text-xs bg-blue-100 px-2 py-1 rounded">
                    [&amp;&gt;[role=checkbox]]:translate-y-[2px]
                  </code>

                  <span className='text-sm text-muted-foreground'>직속 체크박스 2px 아래로 이동</span>
                </div>
              </div>
            </div>

            <h4 className='font-medium text-sm'>상위에서 상속받는 스타일 (실제 적용되는 최종 스타일)</h4>
            <div className='bg-red-50 border border-red-200 rounded p-3'>
              <p className='text-sm text-red-700'>
                <strong>⭐ 최종 계산된 스타일:</strong><br />
                • <strong>font-size: 14px</strong> (table의 text-sm에서 상속 - td에는 직접 폰트 크기 선언 없음!)<br />
                • <strong>font-weight: normal</strong> (기본값, 따로 선언 안됨)<br />
                • <strong>color: 상속된 foreground</strong> (table → tbody → tr → td 순서로 상속)<br />
                • <strong>padding: 8px</strong> (직접 선언된 p-2)<br />
                • <strong>vertical-align: middle</strong> (직접 선언된 align-middle)<br />
                • <strong>white-space: nowrap</strong> (직접 선언된 whitespace-nowrap)<br />
                • <strong>배경색: tr의 상태에 따라 변함</strong> (tr의 hover, selected 상태 상속)
              </p>
            </div>

            <h4 className='font-medium text-sm'>상속 체인 분석</h4>
            <div className='bg-yellow-50 border border-yellow-200 rounded p-3'>
              <p className='text-sm text-yellow-700'>
                <strong>폰트 크기 상속 체인:</strong><br />
                table <code>(text-sm: 14px)</code> → tbody <code>(상속)</code> → tr <code>(상속)</code> → td <code>(상속)</code><br />
                <br />
                <strong>배경색 상속 체인:</strong><br />
                tr <code>(hover:bg-muted/50, data-[state=selected]:bg-muted)</code> → td <code>(배경색 상속받음)</code><br />
                <br />
                <strong>⚠️ td 자체에는 폰트 크기나 색상이 직접 선언되지 않음!</strong>
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Button 스타일 분석 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>Button Components</h3>

          <div className='space-y-4'>
            <h4 className='font-medium'>정렬 버튼 (Column Header)</h4>
            <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
              <code className='text-sm break-all'>
                {'<Button variant="ghost" size="sm" className="-ml-3 h-8 data-[state=open]:bg-accent">'}
              </code>
            </div>

            {/* 실제 예시 */}
            <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
              <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시</h4>
              <div className='border rounded overflow-hidden'>
                <table className='w-full text-sm'>
                  <thead className='bg-muted/20'>
                  <tr>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8">
                        <span>정렬 가능 (14px)</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 bg-accent">
                        <span>활성 상태 (14px)</span>
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                  </tr>
                  </thead>
                </table>
              </div>
              <p className='text-sm text-blue-600 mt-2'>→ Button 내 텍스트도 table의 text-sm(14px)을 상속받음</p>
            </div>

            <div className='space-y-4'>
              <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
              <div className='grid gap-4 md:grid-cols-3'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>variant="ghost"</code>
                    <span className='text-sm text-muted-foreground'>투명 배경</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>size="sm"</code>
                    <span className='text-sm text-muted-foreground'>작은 크기</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>-ml-3</code>
                    <span className='text-sm text-muted-foreground'>margin-left: -0.75rem</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>h-8</code>
                    <span className='text-sm text-muted-foreground'>height: 2rem (32px)</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-blue-100 px-2 py-1 rounded'>data-[state=open]:bg-accent</code>
                    <span className='text-sm text-muted-foreground'>열린 상태 시 accent 색상</span>
                  </div>
                </div>
              </div>

              <h4 className='font-medium text-sm'>상위에서 상속받는 스타일</h4>
              <div className='bg-red-50 border border-red-200 rounded p-3'>
                <p className='text-sm text-red-700'>
                  <strong>⭐ Button 컴포넌트의 상속:</strong><br />
                  • <strong>table의 text-sm(14px)</strong> → th → Button 내부 텍스트<br />
                  • th의 font-medium → Button은 자체 폰트 weight 가짐<br />
                  • th의 text-foreground → Button은 자체 색상 시스템 가짐<br />
                  • <strong>Button 컴포넌트 자체의 기본 스타일이 대부분 override</strong>
                </p>
              </div>

              <h4 className='font-medium text-sm'>Button 컴포넌트 자체 스타일 (shadcn/ui)</h4>
              <div className='bg-green-50 border border-green-200 rounded p-3'>
                <p className='text-sm text-green-700'>
                  • <strong>variant="ghost"</strong>: bg-transparent, hover:bg-accent<br />
                  • <strong>size="sm"</strong>: h-9 px-3 기본값이지만 className의 h-8이 override<br />
                  • <strong>기본 transition</strong>: transition-colors duration-200<br />
                  • <strong>기본 폰트</strong>: font-medium text-sm이지만 상위 table의 text-sm이 이미 적용됨
                </p>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium'>아이콘 버튼 (Actions)</h4>
            <div className='bg-muted/20 p-4 rounded-lg border-2 border-dashed'>
              <code className='text-sm'>
                {'<Button variant="ghost" size="icon" className="h-8 w-8">'}
              </code>
            </div>

            {/* 실제 예시 */}
            <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
              <h4 className='font-medium mb-2 text-blue-700'>실제 적용 예시</h4>
              <div className='flex items-center gap-4'>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8" disabled>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Eye className="h-4 w-4" />
                </Button>
              </div>
              <p className='text-sm text-blue-600 mt-2'>→ 정사각형 아이콘 버튼, table 상속과 무관하게 독립적 스타일</p>
            </div>

            <div className='space-y-4'>
              <h4 className='font-medium text-sm'>직접 적용된 클래스</h4>
              <div className='grid gap-4 md:grid-cols-3'>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>size="icon"</code>
                    <span className='text-sm text-muted-foreground'>정사각형 아이콘용</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>h-8 w-8</code>
                    <span className='text-sm text-muted-foreground'>32x32px 크기</span>
                  </div>
                </div>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>variant="outline"</code>
                    <span className='text-sm text-muted-foreground'>테두리 스타일</span>
                  </div>
                </div>
              </div>

              <h4 className='font-medium text-sm'>상위에서 상속받는 스타일</h4>
              <div className='bg-red-50 border border-red-200 rounded p-3'>
                <p className='text-sm text-red-700'>
                  <strong>⭐ 아이콘 버튼의 상속:</strong><br />
                  • table의 text-sm은 아이콘에 영향 없음 (텍스트가 없으므로)<br />
                  • td 내부에 있어도 Button 컴포넌트의 독립적인 스타일 유지<br />
                  • <strong>Button 자체 스타일이 table 상속보다 우선순위 높음</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* CSS 변수 및 색상 시스템 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>CSS 변수 및 색상 시스템</h3>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 색상 시스템 예시</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <div className='p-3 bg-foreground text-background rounded'>
                  <code className='text-sm'>text-foreground / bg-foreground</code>
                </div>
                <div className='p-3 bg-muted text-foreground rounded border'>
                  <code className='text-sm'>bg-muted</code>
                </div>
                <div className='p-3 bg-muted/50 text-foreground rounded border'>
                  <code className='text-sm'>bg-muted/50 (50% 투명도)</code>
                </div>
              </div>
              <div className='space-y-3'>
                <div className='p-3 border rounded'>
                  <code className='text-sm text-muted-foreground'>text-muted-foreground</code>
                </div>
                <div className='p-3 bg-accent text-accent-foreground rounded'>
                  <code className='text-sm'>bg-accent</code>
                </div>
                <div className='p-3 bg-destructive text-destructive-foreground rounded'>
                  <code className='text-sm'>bg-destructive</code>
                </div>
              </div>
            </div>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>테이블에서 사용되는 색상 변수</h4>
            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-4'>
                <h5 className='font-medium text-sm'>기본 색상 변수 (index.css에서 정의)</h5>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 bg-foreground rounded border'></div>
                    <div className='space-y-1'>
                      <code className='text-sm'>--foreground</code>
                      <p className='text-xs text-muted-foreground'>oklch(0.129 0.042 264.695)</p>
                      <p className='text-xs text-blue-600'>th의 text-foreground, td 상속</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 bg-muted rounded border'></div>
                    <div className='space-y-1'>
                      <code className='text-sm'>--muted</code>
                      <p className='text-xs text-muted-foreground'>oklch(0.968 0.007 247.896)</p>
                      <p className='text-xs text-blue-600'>tr 선택 상태, 호버 배경</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 bg-muted-foreground rounded border'></div>
                    <div className='space-y-1'>
                      <code className='text-sm'>--muted-foreground</code>
                      <p className='text-xs text-muted-foreground'>oklch(0.554 0.046 257.417)</p>
                      <p className='text-xs text-blue-600'>보조 텍스트 색상</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 border rounded'></div>
                    <div className='space-y-1'>
                      <code className='text-sm'>--border</code>
                      <p className='text-xs text-muted-foreground'>oklch(0.929 0.013 255.508)</p>
                      <p className='text-xs text-blue-600'>tr, th 테두리 색상</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h5 className='font-medium text-sm'>테이블 특화 사용법</h5>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 bg-muted rounded border opacity-50'></div>
                    <div className='space-y-1'>
                      <code className='text-sm'>hover:bg-muted/50</code>
                      <p className='text-xs text-muted-foreground'>tr 호버 상태</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 bg-muted rounded border opacity-20'></div>
                    <div className='space-y-1'>
                      <code className='text-sm'>bg-muted/20</code>
                      <p className='text-xs text-muted-foreground'>thead 배경</p>
                    </div>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-6 h-6 bg-accent rounded border'></div>
                    <div className='space-y-1'>
                      <code className='text-sm'>bg-accent</code>
                      <p className='text-xs text-muted-foreground'>활성 정렬 버튼</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <h4 className='font-medium text-sm'>색상 상속 체인</h4>
            <div className='bg-purple-50 border border-purple-200 rounded p-3'>
              <p className='text-sm text-purple-700'>
                <strong>텍스트 색상 상속:</strong><br />
                body <code>(text-foreground)</code> → table → thead/tbody → tr → th/td<br />
                <br />
                <strong>배경색 적용:</strong><br />
                • thead: 직접 bg-muted/20 적용<br />
                • tr: hover:bg-muted/50, data-[state=selected]:bg-muted<br />
                • td: tr의 배경색 상속받음<br />
                <br />
                <strong>⚠️ 대부분의 색상은 CSS 변수를 통해 테마 시스템과 연동됨</strong>
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* 반응형 클래스 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>반응형 클래스</h3>

          {/* 실제 예시 */}
          <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>
            <h4 className='font-medium mb-2 text-blue-700'>실제 반응형 적용 예시</h4>
            <div className='space-y-4'>
              <div className='grid gap-4'>
                <div className='w-[150px] lg:w-[250px] bg-muted p-2 rounded border'>
                  <code className='text-sm'>w-[150px] lg:w-[250px]</code>
                </div>
                <div className='hidden sm:block bg-accent p-2 rounded'>
                  <code className='text-sm text-accent-foreground'>hidden sm:block</code>
                </div>
                <div className='flex items-center space-x-2 sm:space-x-6 lg:space-x-8'>
                  <div className='bg-muted p-2 rounded text-sm'>항목1</div>
                  <div className='bg-muted p-2 rounded text-sm'>항목2</div>
                  <div className='bg-muted p-2 rounded text-sm'>항목3</div>
                </div>
              </div>
            </div>
            <p className='text-sm text-blue-600 mt-2'>→ 화면 크기에 따라 너비와 간격이 자동 조정됨, 모든 텍스트는 14px 유지</p>
          </div>

          <div className='space-y-4'>
            <h4 className='font-medium text-sm'>테이블에서 사용되는 반응형 클래스</h4>
            <div className='grid gap-4 md:grid-cols-3'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>너비 조정</h5>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>w-[150px]</code>
                    <span className='text-sm text-muted-foreground'>기본 150px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>lg:w-[250px]</code>
                    <span className='text-sm text-muted-foreground'>1024px 이상 250px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>max-w-32</code>
                    <span className='text-sm text-muted-foreground'>최대 너비 제한</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>요소 표시/숨김</h5>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>hidden</code>
                    <span className='text-sm text-muted-foreground'>기본 숨김</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>sm:block
                      <span className='text-sm text-muted-foreground'>640px 이상 표시</span>
                    </code>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>lg:flex</code>
                    <span className='text-sm text-muted-foreground'>1024px 이상 flex</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>간격 조정</h5>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>space-x-2</code>
                    <span className='text-sm text-muted-foreground'>기본 간격 8px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>sm:space-x-6</code>
                    <span className='text-sm text-muted-foreground'>640px 이상 24px</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='text-xs bg-muted px-2 py-1 rounded'>lg:space-x-8</code>
                    <span className='text-sm text-muted-foreground'>1024px 이상 32px</span>
                  </div>
                </div>
              </div>
            </div>

            <h4 className='font-medium text-sm'>반응형 상속 관계</h4>
            <div className='bg-orange-50 border border-orange-200 rounded p-3'>
              <p className='text-sm text-orange-700'>
                <strong>⭐ 중요한 상속 유지:</strong><br />
                • 반응형 클래스가 적용되어도 <strong>table의 text-sm(14px)은 모든 브레이크포인트에서 유지됨</strong><br />
                • 색상 변수들도 모든 화면 크기에서 동일하게 상속<br />
                • 레이아웃만 변하고 폰트 크기, 색상 등 핵심 스타일은 상속 체계 유지<br />
                <br />
                <strong>반응형 우선순위:</strong><br />
                기본 클래스 → sm: → md: → lg: → xl: → 2xl: 순서로 override
              </p>
            </div>
          </div>
        </div>

        <Separator />

        {/* 전체 상속 체계 요약 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>전체 CSS 상속 체계 요약</h3>

          <div className='bg-gradient-to-r from-red-50 to-blue-50 border-2 border-red-200 rounded-lg p-6'>
            <h4 className='font-medium mb-4 text-lg text-red-800'>⭐ 핵심 상속 흐름도</h4>

            <div className='space-y-6'>
              <div className='bg-white rounded p-4 border-2 border-red-300'>
                <h5 className='font-medium text-red-700 mb-2'>1단계: Container Level</h5>
                <code className='text-sm bg-red-100 px-2 py-1 rounded'>
                  {'<div className="relative w-full overflow-x-auto">'}
                </code>
                <p className='text-xs text-red-600 mt-1'>
                  • 전역 CSS, body 스타일 상속받음<br />
                  • 하위 요소들의 position 기준점 설정
                </p>
              </div>

              <div className='bg-white rounded p-4 border-2 border-orange-300'>
                <h5 className='font-medium text-orange-700 mb-2'>2단계: Table Level ⭐ 핵심</h5>
                <code className='text-sm bg-orange-100 px-2 py-1 rounded'>
                  {'<table className="w-full caption-bottom text-sm">'}
                </code>
                <p className='text-xs text-orange-600 mt-1'>
                  • <strong>text-sm (14px)</strong> → 모든 하위 요소에 폰트 크기 결정!<br />
                  • w-full → 테이블 전체 너비 결정<br />
                  • 이 레벨이 가장 중요한 상속 포인트
                </p>
              </div>

              <div className='bg-white rounded p-4 border-2 border-yellow-300'>
                <h5 className='font-medium text-yellow-700 mb-2'>3단계: Head/Body Level</h5>
                <code className='text-sm bg-yellow-100 px-2 py-1 rounded block mb-1'>
                  {'<thead className="[&_tr]:border-b">'}
                </code>
                <code className='text-sm bg-yellow-100 px-2 py-1 rounded'>
                  {'<tbody className="[&_tr:last-child]:border-0">'}
                </code>
                <p className='text-xs text-yellow-600 mt-1'>
                  • 테두리 규칙 정의<br />
                  • table의 text-sm 상속받아 전달<br />
                  • 배경색 일부 적용 (thead만)
                </p>
              </div>

              <div className='bg-white rounded p-4 border-2 border-green-300'>
                <h5 className='font-medium text-green-700 mb-2'>4단계: Row Level</h5>
                <code className='text-sm bg-green-100 px-2 py-1 rounded'>
                  {'<tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">'}
                </code>
                <p className='text-xs text-green-600 mt-1'>
                  • 상호작용 스타일 (hover, selected) 정의<br />
                  • table의 text-sm 계속 상속<br />
                  • 배경색이 하위 td에 영향
                </p>
              </div>

              <div className='bg-white rounded p-4 border-2 border-blue-300'>
                <h5 className='font-medium text-blue-700 mb-2'>5단계: Cell Level</h5>
                <code className='text-sm bg-blue-100 px-2 py-1 rounded block mb-1'>
                  {'<th className="text-foreground h-10 px-2 text-left align-middle font-medium whitespace-nowrap">'}
                </code>
                <code className='text-sm bg-blue-100 px-2 py-1 rounded'>
                  {'<td className="p-2 align-middle whitespace-nowrap">'}
                </code>
                <p className='text-xs text-blue-600 mt-1'>
                  • <strong>폰트 크기는 직접 선언 없음!</strong> → table의 text-sm 상속<br />
                  • 패딩, 정렬, 색상만 직접 선언<br />
                  • 최종 사용자가 보는 스타일 완성
                </p>
              </div>
            </div>

            <div className='mt-6 bg-red-100 border border-red-300 rounded p-4'>
              <h5 className='font-medium text-red-800 mb-2'>🚨 절대 놓치면 안 되는 핵심 포인트</h5>
              <ul className='text-sm text-red-700 space-y-1'>
                <li>• <strong>table의 text-sm이 모든 th, td 폰트 크기를 결정함</strong></li>
                <li>• th, td 요소에는 폰트 크기가 직접 선언되지 않음</li>
                <li>• CSS cascade에 의해 상위에서 하위로 스타일이 흘러감</li>
                <li>• Button 컴포넌트 등은 자체 스타일로 상속을 override</li>
                <li>• 색상 변수들이 CSS 변수 시스템으로 전역 관리됨</li>
              </ul>
            </div>
          </div>
        </div>

        <Separator />

        {/* 디버깅 가이드 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>CSS 상속 디버깅 가이드</h3>

          <div className='bg-gray-50 border border-gray-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-gray-800'>개발자 도구에서 확인하는 방법</h4>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>1. 폰트 크기 상속 추적</h5>
                <div className='bg-white border rounded p-3'>
                  <code className='text-xs block mb-1'>td 요소 선택 → Computed 탭</code>
                  <code className='text-xs block mb-1'>font-size: 14px</code>
                  <code className='text-xs block mb-1'>상속 경로: table &gt; tbody &gt; tr &gt; td</code>
                  <code className='text-xs text-green-600'>원본: table.text-sm</code>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>2. 색상 상속 추적</h5>
                <div className='bg-white border rounded p-3'>
                  <code className='text-xs block mb-1'>th 요소 선택 → Computed 탭</code>
                  <code className='text-xs block mb-1'>color: var(--foreground)</code>
                  <code className='text-xs block mb-1'>상속 경로: th.text-foreground</code>
                  <code className='text-xs text-green-600'>원본: CSS 변수 시스템</code>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>3. 배경색 상속 추적</h5>
                <div className='bg-white border rounded p-3'>
                  <code className='text-xs block mb-1'>선택된 td 요소 선택</code>
                  <code className='text-xs block mb-1'>background-color: var(--muted)</code>
                  <code className='text-xs block mb-1'>상속 경로: tr[data-state=selected]</code>
                  <code className='text-xs text-green-600'>원본: tr의 조건부 클래스</code>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>4. 반응형 확인</h5>
                <div className='bg-white border rounded p-3'>
                  <code className='text-xs block mb-1'>Device Toolbar 열기</code>
                  <code className='text-xs block mb-1'>화면 크기 변경하며 확인</code>
                  <code className='text-xs block mb-1'>hidden sm:block 등 동작 확인</code>
                  <code className='text-xs text-green-600'>text-sm은 모든 크기에서 유지</code>
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
)
}


// 3단계: 컴포넌트별 분해 및 분석 (완전한 시각적 예시)
function ComponentBreakdownSection() {
  type ComponentKey = 'toolbar' | 'columnHeaders' | 'pagination' | 'tableRows'

  const [activeComponent, setActiveComponent] = useState<ComponentKey>('columnHeaders')

  const components: Record<ComponentKey, {
    title: string
    description: string
    code: string
    analysis: Array<{ class: string; description: string }>
  }> = {
    toolbar: {
      title: 'Toolbar Component',
      description: '검색, 필터, 액션 버튼이 포함된 툴바',
      code: `<div className='flex items-center justify-between'>
 <div className='flex flex-1 items-center space-x-2'>
   <div className="relative">
     <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
     <Input
       placeholder="사용자 검색..."
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
   <Button variant="ghost" className="h-8 px-2 lg:px-3">
     리셋 ✕
   </Button>
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
</div>`,
      analysis: [
        { class: 'flex items-center justify-between', description: 'Flexbox로 좌우 정렬, 세로 가운데 정렬' },
        { class: 'flex-1', description: '남은 공간 모두 차지 (좌측 영역)' },
        { class: 'space-x-2', description: '하위 요소간 0.5rem 가로 간격' },
        { class: 'relative', description: '아이콘 절대 위치의 기준점' },
        { class: 'absolute left-2 top-2.5', description: '아이콘을 입력창 내부 좌측에 배치' },
        { class: 'pl-8', description: '아이콘 공간만큼 좌측 패딩 추가' },
        { class: 'h-8', description: '모든 컨트롤 요소 32px 높이 통일' },
        { class: 'w-[150px] lg:w-[250px]', description: '검색창 반응형 너비 조정' }
      ]
    },
    columnHeaders: {
      title: 'Column Headers',
      description: '정렬 가능한 헤더와 일반 헤더의 구분',
      code: `<!-- 정렬 가능한 헤더 (Button 기반) -->
<th className="h-10 px-2 text-left align-middle font-medium">
 <Button
   variant="ghost"
   size="sm"
   className="-ml-3 h-8 data-[state=open]:bg-accent"
   onClick={() => handleSort('name')}
 >
   <span>이름</span>
   <ChevronsUpDown className="ml-2 h-4 w-4" />
 </Button>
</th>

<!-- 일반 헤더 (정렬 불가능) -->
<th className="h-10 px-2 text-left align-middle font-medium">
 이메일
</th>

<!-- 체크박스 헤더 -->
<th className="h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0">
 <Checkbox
   checked={allSelected}
   onCheckedChange={toggleAllSelection}
   className="translate-y-[2px]"
 />
</th>

<!-- 액션 헤더 (빈 헤더) -->
<th className="h-10 px-2 text-left align-middle font-medium">
 {/* 빈 헤더 - 액션 컬럼용 */}
</th>`,
      analysis: [
        { class: 'variant="ghost"', description: 'Button 컴포넌트의 투명 배경 스타일' },
        { class: 'size="sm"', description: '작은 크기 버튼 (height: 2rem)' },
        { class: '-ml-3', description: '좌측으로 0.75rem 이동하여 패딩과 정렬' },
        { class: 'h-8', description: '버튼 높이 32px로 고정' },
        { class: 'data-[state=open]:bg-accent', description: '드롭다운 열린 상태 시 accent 배경색' },
        { class: '[&:has([role=checkbox])]:pr-0', description: '체크박스 포함 시 우측 패딩 제거' },
        { class: 'translate-y-[2px]', description: '체크박스 수직 위치 2px 미세 조정' },
        { class: 'h-10 px-2 font-medium', description: '모든 헤더 셀 공통 스타일' }
      ]
    },
    pagination: {
      title: 'Pagination Component',
      description: '페이지 네비게이션 및 행 수 선택',
      code: `<div className='flex items-center justify-between overflow-clip px-2' style={{ overflowClipMargin: 1 }}>
 <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
   {selectedRows.size} / {processedData.length} 행이 선택됨
 </div>
 <div className='flex items-center sm:space-x-6 lg:space-x-8'>
   <div className="flex items-center space-x-2">
     <p className="hidden text-sm font-medium sm:block">페이지당 행 수</p>
     <Select
       value={\`$\{pageSize\}\`}
       onValueChange={(value) => {
         setPageSize(Number(value))
         setCurrentPage(1)
       }}
     >
       <SelectTrigger className="h-8 w-[70px]">
         <SelectValue />
       </SelectTrigger>
       <SelectContent side="top">
         {[5, 10, 20, 30, 40, 50].map((size) => (
           <SelectItem key={size} value={\`$\{size\}\`}>
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
</div>`,
      analysis: [
        { class: 'overflow-clip px-2', description: '내용 잘림 처리 및 좌우 패딩' },
        { class: 'overflowClipMargin: 1', description: '인라인 스타일로 클립 마진 설정' },
        { class: 'hidden sm:block', description: '모바일에서 숨김, 640px 이상에서 표시' },
        { class: 'flex-1', description: '좌측 정보 영역이 남은 공간 차지' },
        { class: 'sm:space-x-6 lg:space-x-8', description: '반응형 간격 (모바일 0 → 태블릿 24px → 데스크톱 32px)' },
        { class: 'w-[70px]', description: '셀렉트 박스 고정 너비 70px' },
        { class: 'h-8 w-8 p-0', description: '32x32px 정사각형 버튼, 패딩 제거' },
        { class: 'sr-only', description: '스크린 리더 전용 텍스트 (접근성)' }
      ]
    },
    tableRows: {
      title: 'Table Rows & Cells',
      description: '다양한 타입의 테이블 행과 셀',
      code: `<!-- 체크박스 셀 -->
<td className="p-2 align-middle whitespace-nowrap [&:has([role=checkbox])]:pr-0 [&>[role=checkbox]]:translate-y-[2px]">
 <Checkbox
   checked={isSelected}
   onCheckedChange={() => toggleRowSelection(user.id)}
   className="translate-y-[2px]"
 />
</td>

<!-- 배지 + 텍스트 셀 -->
<td className="p-2 align-middle whitespace-nowrap">
 <div className="flex space-x-2">
   <Badge variant="outline">{user.department}</Badge>
   <span className="max-w-32 truncate font-medium sm:max-w-72 md:max-w-[31rem]">
     {user.name}
   </span>
 </div>
</td>

<!-- 상태 표시 셀 -->
<td className="p-2 align-middle whitespace-nowrap">
 <div className="flex w-[100px] items-center">
   <StatusIcon className={\`mr-2 h-4 w-4 $\{status.color\}\`} />
   <span>{status.label}</span>
 </div>
</td>

<!-- 일반 텍스트 셀 -->
<td className="p-2 align-middle whitespace-nowrap">
 {user.email}
</td>

<!-- 액션 버튼 셀 -->
<td className="p-2 align-middle whitespace-nowrap">
 <Button variant="ghost" size="icon" className="h-8 w-8">
   <MoreHorizontal className="h-4 w-4" />
 </Button>
</td>

<!-- 행 전체 스타일 -->
<tr className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors">
 {/* 위의 셀들 */}
</tr>`,
      analysis: [
        { class: 'p-2 align-middle', description: '기본 셀 패딩 8px 및 수직 가운데 정렬' },
        { class: 'whitespace-nowrap', description: '텍스트 줄바꿈 방지' },
        { class: '[&:has([role=checkbox])]:pr-0', description: '체크박스 포함 셀의 우측 패딩 제거' },
        { class: '[&>[role=checkbox]]:translate-y-[2px]', description: '직속 체크박스 2px 아래로 미세 조정' },
        { class: 'flex space-x-2', description: '배지와 텍스트 가로 배치, 8px 간격' },
        { class: 'max-w-32 truncate', description: '최대 너비 128px, 초과 시 말줄임표' },
        { class: 'w-[100px]', description: '상태 셀 고정 너비 100px' },
        { class: 'hover:bg-muted/50', description: '호버 시 50% 투명도 배경색' },
        { class: 'data-[state=selected]:bg-muted', description: '선택 상태 시 배경색 변경' },
        { class: 'transition-colors', description: '색상 변화에 부드러운 애니메이션 효과' }
      ]
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🔧 컴포넌트별 분해 및 분석
          <Badge variant='secondary'>상세 시각적 예시</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>

        {/* 컴포넌트 선택 탭 */}
        <div className="flex flex-wrap gap-2">
          {(Object.entries(components) as [ComponentKey, typeof components[ComponentKey]][]).map(([key, component]) => (
            <Button
              key={key}
              variant={activeComponent === key ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveComponent(key)}
            >
              {component.title}
            </Button>
          ))}
        </div>

        {/* 선택된 컴포넌트 상세 분석 */}
        <div className='space-y-6'>
          <div>
            <h3 className='text-lg font-semibold mb-2'>{components[activeComponent].title}</h3>
            <p className='text-muted-foreground'>{components[activeComponent].description}</p>
          </div>

          {/* 실제 컴포넌트 미리보기 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>상세 시각적 예시</h4>
            <div className='bg-white border-2 border-blue-500 rounded-lg p-4'>

              {activeComponent === 'toolbar' && (
                <div className='space-y-6'>
                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>완전한 툴바 예시</h5>
                    <div className='border rounded-lg p-4'>
                      <div className='flex items-center justify-between'>
                        <div className='flex flex-1 items-center space-x-2'>
                          <div className="relative">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="사용자 검색..."
                              className="h-8 w-[150px] lg:w-[250px] pl-8"
                            />
                          </div>
                          <Select defaultValue="all">
                            <SelectTrigger className="h-8 w-[100px]">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">모든 상태</SelectItem>
                              <SelectItem value="active">활성</SelectItem>
                              <SelectItem value="pending">대기</SelectItem>
                              <SelectItem value="inactive">비활성</SelectItem>
                            </SelectContent>
                          </Select>
                          <Button variant="ghost" className="h-8 px-2 lg:px-3">
                            리셋 ✕
                          </Button>
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
                    </div>
                    <div className='mt-2 text-sm text-blue-600 space-y-1'>
                      <div>→ 좌측: 검색창 + 필터 셀렉트 + 리셋 버튼 (flex-1으로 공간 차지)</div>
                      <div>→ 우측: 액션 버튼들 (고정 너비)</div>
                      <div>→ 모든 컨트롤이 h-8로 높이 통일</div>
                    </div>
                  </div>

                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>반응형 동작</h5>
                    <div className='grid gap-4 md:grid-cols-2'>
                      <div>
                        <p className='text-sm font-medium mb-2'>모바일 (640px 이하)</p>
                        <div className='border rounded p-2 max-w-xs'>
                          <div className='flex flex-col gap-2'>
                            <Input placeholder="검색..." className="h-8 w-full pl-8" />
                            <div className='flex gap-2'>
                              <Select>
                                <SelectTrigger className="h-8 flex-1">
                                  <SelectValue placeholder="상태" />
                                </SelectTrigger>
                              </Select>
                              <Button variant="outline" size="sm" className="flex-1">액션</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <p className='text-sm font-medium mb-2'>데스크톱 (≥ 1024px)</p>
                        <div className='border rounded p-2'>
                          <div className='flex items-center justify-between'>
                            <div className='flex items-center space-x-2'>
                              <Input placeholder="검색..." className="h-8 w-64 pl-8" />
                              <Select>
                                <SelectTrigger className="h-8 w-24">
                                  <SelectValue placeholder="상태" />
                                </SelectTrigger>
                              </Select>
                            </div>
                            <div className='flex items-center space-x-2'>
                              <Button variant="outline" size="sm">내보내기</Button>
                              <Button variant="outline" size="sm">컬럼</Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeComponent === 'columnHeaders' && (
                <div className='space-y-6'>
                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>1. 정렬 가능한 헤더 (Button 기반)</h5>
                    <div className='border rounded overflow-hidden'>
                      <table className='w-full text-sm'>
                        <thead className='bg-muted/20'>
                        <tr>
                          <th className='h-10 px-2 text-left align-middle font-medium'>
                            <Button variant="ghost" size="sm" className="-ml-3 h-8">
                              <span>이름</span>
                              <ChevronsUpDown className="ml-2 h-4 w-4" />
                            </Button>
                          </th>
                          <th className='h-10 px-2 text-left align-middle font-medium'>
                            <Button variant="ghost" size="sm" className="-ml-3 h-8 bg-accent">
                              <span>상태</span>
                              <ChevronUp className="ml-2 h-4 w-4" />
                            </Button>
                          </th>
                          <th className='h-10 px-2 text-left align-middle font-medium'>
                            <Button variant="ghost" size="sm" className="-ml-3 h-8">
                              <span>생성일</span>
                              <ChevronDown className="ml-2 h-4 w-4" />
                            </Button>
                          </th>
                        </tr>
                        </thead>
                      </table>
                    </div>
                    <div className='mt-2 text-sm text-blue-600 space-y-1'>
                      <div>→ ChevronsUpDown: 정렬 안됨 (기본 상태)</div>
                      <div>→ ChevronUp: 오름차순 정렬 (bg-accent로 활성 표시)</div>
                      <div>→ ChevronDown: 내림차순 정렬</div>
                    </div>
                  </div>

                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>2. 일반 헤더 (정렬 불가)</h5>
                    <div className='border rounded overflow-hidden'>
                      <table className='w-full text-sm'>
                        <thead className='bg-muted/20'>
                        <tr>
                          <th className='h-10 px-2 text-left align-middle font-medium'>이메일</th>
                          <th className='h-10 px-2 text-left align-middle font-medium'>설명</th>
                          <th className='h-10 px-2 text-left align-middle font-medium'>액션</th>
                        </tr>
                        </thead>
                      </table>
                    </div>
                    <p className='text-sm text-blue-600 mt-2'>→ 정렬이 불필요한 컬럼은 단순 텍스트로 표시 (이메일, 설명, 액션 등)</p>
                  </div>

                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>3. 체크박스 헤더</h5>
                    <div className='border rounded overflow-hidden'>
                      <table className='w-full text-sm'>
                        <thead className='bg-muted/20'>
                        <tr>
                          <th className='h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0'>
                            <Checkbox className="translate-y-[2px]" />
                          </th>
                          <th className='h-10 px-2 text-left align-middle font-medium'>선택 컬럼</th>
                        </tr>
                        </thead>
                      </table>
                    </div>
                    <p className='text-sm text-blue-600 mt-2'>→ 전체 선택용 체크박스, [&:has([role=checkbox])]:pr-0으로 우측 패딩 제거</p>
                  </div>

                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>4. 빈 헤더 (액션 컬럼)</h5>
                    <div className='border rounded overflow-hidden'>
                      <table className='w-full text-sm'>
                        <thead className='bg-muted/20'>
                        <tr>
                          <th className='h-10 px-2 text-left align-middle font-medium'>이름</th>
                          <th className='h-10 px-2 text-left align-middle font-medium'></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                          <td className='p-2'>김철수</td>
                          <td className='p-2'>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <p className='text-sm text-blue-600 mt-2'>→ 액션 버튼용 컬럼은 헤더가 비어있음</p>
                  </div>
                </div>
              )}

              {activeComponent === 'pagination' && (
                <div className='space-y-6'>
                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>완전한 페이지네이션 예시</h5>
                    <div className='border rounded-lg p-4'>
                      <div className='flex items-center justify-between overflow-clip px-2'>
                        <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
                          3 / 25 행이 선택됨
                        </div>
                        <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                          <div className="flex items-center space-x-2">
                            <span className="hidden text-sm font-medium sm:block">페이지당 행 수</span>
                            <Select defaultValue="10">
                              <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent side="top">
                                <SelectItem value="5">5</SelectItem>
                                <SelectItem value="10">10</SelectItem>
                                <SelectItem value="20">20</SelectItem>
                                <SelectItem value="50">50</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                            1 / 5 페이지
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" disabled>
                              ««
                            </Button>
                            <Button variant="outline" className="h-8 w-8 p-0" disabled>
                              «
                            </Button>
                            <Button variant="outline" className="h-8 w-8 p-0">
                              »
                            </Button>
                            <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
                              »»
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='mt-2 text-sm text-blue-600 space-y-1'>
                      <div>→ 좌측: 선택된 행 정보 (모바일에서 숨김)</div>
                      <div>→ 가운데: 페이지 크기 선택 + 현재 페이지 정보</div>
                      <div>→ 우측: 네비게이션 버튼 (첫/마지막 버튼은 lg 이상에서만 표시)</div>
                    </div>
                  </div>

                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>반응형 동작</h5>
                    <div className='grid gap-4 md:grid-cols-2'>
                      <div>
                        <p className='text-sm font-medium mb-2'>모바일 (640p 이하)</p>
                        <div className='border rounded p-2'>
                          <div className='flex items-center justify-end space-x-2'>
                            <Select defaultValue="10">
                              <SelectTrigger className="h-8 w-[70px]">
                                <SelectValue />
                              </SelectTrigger>
                            </Select>
                            <span className="text-sm">1/5</span>
                            <Button variant="outline" className="h-8 w-8 p-0" disabled>«</Button>
                            <Button variant="outline" className="h-8 w-8 p-0">»</Button>
                          </div>
                        </div>
                        <p className='text-sm text-muted-foreground mt-1'>선택 정보와 라벨 숨김, 간격 축소</p>
                      </div>
                      <div>
                        <p className='text-sm font-medium mb-2'>데스크톱 (≥ 1024px)</p>
                        <div className='border rounded p-2'>
                          <div className='flex items-center justify-between'>
                            <div className='text-sm text-muted-foreground'>3 / 25 행 선택</div>
                            <div className='flex items-center space-x-8'>
                              <div className='flex items-center space-x-2'>
                                <span className="text-sm">페이지당 행 수</span>
                                <Select defaultValue="10">
                                  <SelectTrigger className="h-8 w-[70px]">
                                    <SelectValue />
                                  </SelectTrigger>
                                </Select>
                              </div>
                              <span className="text-sm">1 / 5 페이지</span>
                              <div className='flex items-center space-x-2'>
                                <Button variant="outline" className="h-8 w-8 p-0">««</Button>
                                <Button variant="outline" className="h-8 w-8 p-0" disabled>«</Button>
                                <Button variant="outline" className="h-8 w-8 p-0">»</Button>
                                <Button variant="outline" className="h-8 w-8 p-0">»»</Button>
                              </div>
                            </div>
                          </div>
                        </div>
                        <p className='text-sm text-muted-foreground mt-1'>모든 요소 표시, 넓은 간격</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeComponent === 'tableRows' && (
                <div className='space-y-6'>
                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>다양한 셀 타입 완전한 예시</h5>
                    <div className='border rounded overflow-hidden'>
                      <table className='w-full text-sm'>
                        <thead className='bg-muted/20'>
                        <tr>
                          <th className='h-10 px-2 text-left font-medium [&:has([role=checkbox])]:pr-0'>
                            <Checkbox className="translate-y-[2px]" />
                          </th>
                          <th className='h-10 px-2 text-left font-medium'>사용자</th>
                          <th className='h-10 px-2 text-left font-medium'>상태</th>
                          <th className='h-10 px-2 text-left font-medium'>이메일</th>
                          <th className='h-10 px-2 text-left font-medium'></th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr className='border-b hover:bg-muted/50 transition-colors'>
                          <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                            <Checkbox className="translate-y-[2px]" />
                          </td>
                          <td className='p-2 align-middle'>
                            <div className="flex space-x-2">
                              <Badge variant="outline">개발팀</Badge>
                              <span className="max-w-32 truncate font-medium">김철수</span>
                            </div>
                          </td>
                          <td className='p-2 align-middle'>
                            <div className="flex w-[100px] items-center">
                              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                              <span>활성</span>
                            </div>
                          </td>
                          <td className='p-2 align-middle'>kim@company.com</td>
                          <td className='p-2 align-middle'>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className='border-b bg-muted transition-colors'>
                          <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                            <Checkbox className="translate-y-[2px]" checked />
                          </td>
                          <td className='p-2 align-middle'>
                            <div className="flex space-x-2">
                              <Badge variant="outline">디자인팀</Badge>
                              <span className="max-w-32 truncate font-medium">이영희</span>
                            </div>
                          </td>
                          <td className='p-2 align-middle'>
                            <div className="flex w-[100px] items-center">
                              <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                              <span>대기</span>
                            </div>
                          </td>
                          <td className='p-2 align-middle'>lee@company.com</td>
                          <td className='p-2 align-middle'>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        <tr className='border-b hover:bg-muted/50 transition-colors'>
                          <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                            <Checkbox className="translate-y-[2px]" />
                          </td>
                          <td className='p-2 align-middle'>
                            <div className="flex space-x-2">
                              <Badge variant="outline">기획팀</Badge>
                              <span className="max-w-32 truncate font-medium">박민수</span>
                            </div>
                          </td>
                          <td className='p-2 align-middle'>
                            <div className="flex w-[100px] items-center">
                              <AlertCircle className="mr-2 h-4 w-4 text-gray-500" />
                              <span>비활성</span>
                            </div>
                          </td>
                          <td className='p-2 align-middle'>park@company.com</td>
                          <td className='p-2 align-middle'>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div className='mt-2 text-sm text-blue-600 space-y-1'>
                      <div>→ 첫 번째 행: 일반 상태, 호버 효과</div>
                      <div>→ 두 번째 행: 선택된 상태 (bg-muted)</div>
                      <div>→ 세 번째 행: 일반 상태</div>
                    </div>
                  </div>

                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>셀 타입별 구조 분석</h5>
                    <div className='grid gap-4 md:grid-cols-2'>
                      <div>
                        <p className='text-sm font-medium mb-2'>체크박스 셀</p>
                        <div className='bg-muted/20 p-2 rounded text-xs font-mono'>
                          {'<td className="[&:has([role=checkbox])]:pr-0">'}
                          <br />
                          {'  <Checkbox className="translate-y-[2px]" />'}
                          <br />
                          {'</td>'}
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>우측 패딩 제거, 체크박스 위치 조정</p>
                      </div>
                      <div>
                        <p className='text-sm font-medium mb-2'>배지 + 텍스트 셀</p>
                        <div className='bg-muted/20 p-2 rounded text-xs font-mono'>
                          {'<div className="flex space-x-2">'}
                          <br />
                          {'  <Badge variant="outline">팀</Badge>'}
                          <br />
                          {'  <span className="truncate">이름</span>'}
                          <br />
                          {'</div>'}
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>Flex 레이아웃, 텍스트 말줄임 처리</p>
                      </div>
                      <div>
                        <p className='text-sm font-medium mb-2'>상태 표시 셀</p>
                        <div className='bg-muted/20 p-2 rounded text-xs font-mono'>
                          {'<div className="flex w-[100px] items-center">'}
                          <br />
                          {'  <Icon className="mr-2 h-4 w-4 text-green-500" />'}
                          <br />
                          {'  <span>상태</span>'}
                          <br />
                          {'</div>'}
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>고정 너비, 아이콘 + 텍스트 조합</p>
                      </div>
                      <div>
                        <p className='text-sm font-medium mb-2'>액션 버튼 셀</p>
                        <div className='bg-muted/20 p-2 rounded text-xs font-mono'>
                          {'<Button variant="ghost" size="icon"'}
                          <br />
                          {'  className="h-8 w-8">'}
                          <br />
                          {'  <MoreHorizontal className="h-4 w-4" />'}
                          <br />
                          {'</Button>'}
                        </div>
                        <p className='text-xs text-muted-foreground mt-1'>정사각형 아이콘 버튼</p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h5 className='font-medium mb-3 text-blue-700'>행 상태별 스타일</h5>
                    <div className='space-y-2'>
                      <div className='border rounded p-2 transition-colors'>
                        <span className='text-sm'>일반 상태: border-b transition-colors</span>
                      </div>
                      <div className='border rounded p-2 bg-muted/50 transition-colors'>
                        <span className='text-sm'>호버 상태: hover:bg-muted/50</span>
                      </div>
                      <div className='border rounded p-2 bg-muted transition-colors'>
                        <span className='text-sm'>선택 상태: data-[state=selected]:bg-muted</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* 코드 구조 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>HTML/JSX 구조</h4>
            <div className='bg-muted/30 p-4 rounded-lg overflow-x-auto'>
             <pre className='text-sm'>
               <code>{components[activeComponent].code}</code>
             </pre>
            </div>
          </div>

          {/* 클래스별 상세 분석 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>클래스별 상세 분석</h4>
            <div className='space-y-3'>
              {components[activeComponent].analysis.map((item, index) => (
                <div key={index} className='flex items-start gap-3 p-3 border rounded-lg'>
                  <code className='text-xs bg-muted px-2 py-1 rounded flex-shrink-0'>
                    {item.class}
                  </code>
                  <p className='text-sm text-muted-foreground'>{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 피그마 구현 가이드 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>피그마 구현 가이드</h4>
            <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
              <h5 className='font-medium text-green-800 mb-3'>피그마에서 이 컴포넌트 만들기</h5>
              <div className='text-sm text-green-700 space-y-2'>
                {activeComponent === 'toolbar' && (
                  <>
                    <div>• <strong>Frame 생성:</strong> Auto Layout 활성화, Space Between 설정</div>
                    <div>• <strong>좌측 그룹:</strong> Fill Container, Auto Layout으로 요소들 배치</div>
                    <div>• <strong>검색 필드:</strong> Input 컴포넌트 + 절대 위치 아이콘 오버레이</div>
                    <div>• <strong>우측 그룹:</strong> Fixed Width, 버튼들 Auto Layout 가로 배치</div>
                    <div>• <strong>반응형:</strong> Desktop/Tablet/Mobile 별도 컴포넌트 변형 생성</div>
                    <div>• <strong>높이 통일:</strong> 모든 컨트롤 32px 높이로 통일</div>
                  </>
                )}

                {activeComponent === 'columnHeaders' && (
                  <>
                    <div>• <strong>정렬 가능 헤더:</strong> Button 컴포넌트 기반으로 생성</div>
                    <div>• <strong>상태 변형:</strong> Default(ChevronsUpDown), Asc(ChevronUp), Desc(ChevronDown)</div>
                    <div>• <strong>활성 상태:</strong> bg-accent 배경색으로 현재 정렬 컬럼 표시</div>
                    <div>• <strong>일반 헤더:</strong> 단순 Text 컴포넌트로 구성</div>
                    <div>• <strong>체크박스 헤더:</strong> Checkbox + 우측 패딩 제거 처리</div>
                    <div>• <strong>빈 헤더:</strong> 액션 컬럼용 Empty Frame</div>
                  </>
                )}

                {activeComponent === 'pagination' && (
                  <>
                  <div>• <strong>복합 컴포넌트:</strong> 3개 주요 영역으로 구성</div>
                    <div>• <strong>좌측 정보:</strong> Text 컴포넌트, 모바일 Visible False 설정</div>
                    <div>• <strong>가운데 컨트롤:</strong> Select + Text 조합, Auto Layout</div>
                    <div>• <strong>우측 네비게이션:</strong> Button 시리즈, 정사각형 32x32px</div>
                    <div>• <strong>반응형 간격:</strong> 브레이크포인트별 Auto Layout Spacing 조정</div>
                    <div>• <strong>숨김 처리:</strong> 첫/마지막 버튼은 Desktop Variant에서만 표시</div>
                  </>
                )}

                {activeComponent === 'tableRows' && (
                  <>
                    <div>• <strong>행 컴포넌트:</strong> Auto Layout 활성화, Fill Container</div>
                    <div>• <strong>상태 관리:</strong> Default, Hover, Selected 변형 생성</div>
                    <div>• <strong>셀 구조:</strong> 각 셀을 개별 컴포넌트로 분리</div>
                    <div>• <strong>체크박스 셀:</strong> Fixed Width, Checkbox + 위치 조정</div>
                    <div>• <strong>배지 셀:</strong> Auto Layout, Badge + Text 조합</div>
                    <div>• <strong>상태 셀:</strong> Fixed Width 100px, Icon + Text</div>
                    <div>• <strong>액션 셀:</strong> Fixed Width, Icon Button</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 디자인 토큰 연결 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>디자인 토큰 연결</h4>
            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>색상 토큰</h5>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-foreground rounded'></div>
                    <code className='text-xs'>text-foreground</code>
                    <span className='text-xs text-muted-foreground'>→ Colors/Text/Primary</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-muted-foreground rounded'></div>
                    <code className='text-xs'>text-muted-foreground</code>
                    <span className='text-xs text-muted-foreground'>→ Colors/Text/Secondary</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-muted rounded border'></div>
                    <code className='text-xs'>bg-muted</code>
                    <span className='text-xs text-muted-foreground'>→ Colors/Background/Subtle</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-accent rounded'></div>
                    <code className='text-xs'>bg-accent</code>
                    <span className='text-xs text-muted-foreground'>→ Colors/Background/Accent</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium text-sm'>크기 토큰</h5>
                <div className='space-y-2'>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-4 bg-muted rounded'></div>
                    <code className='text-xs'>h-8</code>
                    <span className='text-xs text-muted-foreground'>→ Sizing/Height/Small (32px)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-2 h-5 bg-muted rounded'></div>
                    <code className='text-xs'>h-10</code>
                    <span className='text-xs text-muted-foreground'>→ Sizing/Height/Medium (40px)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-1 h-2 bg-muted rounded'></div>
                    <code className='text-xs'>p-2</code>
                    <span className='text-xs text-muted-foreground'>→ Spacing/Padding/Small (8px)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-3 h-1 bg-muted rounded'></div>
                    <code className='text-xs'>space-x-2</code>
                    <span className='text-xs text-muted-foreground'>→ Spacing/Gap/Small (8px)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 접근성 고려사항 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>접근성 고려사항</h4>
            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <div className='text-sm text-blue-700 space-y-2'>
                {activeComponent === 'toolbar' && (
                  <>
                    <div>• <strong>키보드 탐색:</strong> Tab으로 모든 입력 요소 순차 접근 가능</div>
                    <div>• <strong>스크린 리더:</strong> 검색 필드에 aria-label="사용자 검색" 추가</div>
                    <div>• <strong>아이콘 설명:</strong> Search 아이콘에 aria-hidden="true" 추가</div>
                    <div>• <strong>필터 상태:</strong> Select에 aria-label="상태 필터" 추가</div>
                    <div>• <strong>버튼 설명:</strong> 아이콘 버튼에 적절한 aria-label 제공</div>
                  </>
                )}

                {activeComponent === 'columnHeaders' && (
                  <>
                    <div>• <strong>정렬 상태:</strong> th에 aria-sort="ascending|descending|none" 추가</div>
                    <div>• <strong>버튼 역할:</strong> 정렬 버튼에 role="button" 명시</div>
                    <div>• <strong>키보드 지원:</strong> Enter, Space로 정렬 토글 실행</div>
                    <div>• <strong>상태 알림:</strong> 정렬 변경 시 스크린 리더에 알림</div>
                    <div>• <strong>체크박스:</strong> aria-label="모든 행 선택" 추가</div>
                  </>
                )}

                {activeComponent === 'pagination' && (
                  <>
                    <div>• <strong>네비게이션 역할:</strong> 전체 영역에 role="navigation" 추가</div>
                    <div>• <strong>페이지 정보:</strong> aria-label="페이지 1 of 5" 제공</div>
                    <div>• <strong>비활성 버튼:</strong> disabled 상태일 때 aria-disabled="true"</div>
                    <div>• <strong>페이지 크기:</strong> Select에 aria-label="페이지당 행 수 선택"</div>
                    <div>• <strong>선택 정보:</strong> 선택된 행 수를 aria-live="polite"로 실시간 알림</div>
                  </>
                )}

                {activeComponent === 'tableRows' && (
                  <>
                    <div>• <strong>선택 상태:</strong> tr에 aria-selected="true/false" 추가</div>
                    <div>• <strong>체크박스:</strong> 각 행 체크박스에 적절한 label 제공</div>
                    <div>• <strong>행 설명:</strong> 필요시 aria-describedby로 추가 정보 제공</div>
                    <div>• <strong>상태 표시:</strong> 상태 아이콘에 aria-label="활성 상태" 추가</div>
                    <div>• <strong>액션 버튼:</strong> "사용자 김철수 작업 메뉴" 등 구체적 label</div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* 개발 구현 팁 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>개발 구현 팁</h4>
            <div className='bg-yellow-50 border border-yellow-200 rounded-lg p-4'>
              <div className='text-sm text-yellow-700 space-y-2'>
                {activeComponent === 'toolbar' && (
                  <>
                    <div>• <strong>검색 디바운싱:</strong> 300ms 지연으로 API 호출 최적화</div>
                    <div>• <strong>필터 상태 관리:</strong> URL 쿼리 파라미터와 동기화</div>
                    <div>• <strong>반응형 처리:</strong> useMediaQuery 훅으로 브레이크포인트 감지</div>
                    <div>• <strong>성능 최적화:</strong> 필터 조합을 useMemo로 메모이제이션</div>
                  </>
                )}

                {activeComponent === 'columnHeaders' && (
                  <>
                    <div>• <strong>정렬 상태:</strong> sortBy, sortDirection 상태로 관리</div>
                    <div>• <strong>아이콘 조건부 렌더링:</strong> 삼항 연산자로 적절한 아이콘 표시</div>
                    <div>• <strong>클릭 핸들러:</strong> column.getCanSort()로 정렬 가능 여부 확인</div>
                    <div>• <strong>전체 선택:</strong> isAllSelected, isSomeSelected 상태 계산</div>
                  </>
                )}

                {activeComponent === 'pagination' && (
                  <>
                    <div>• <strong>페이지 계산:</strong> Math.ceil(totalItems / pageSize)로 총 페이지 수 계산</div>
                    <div>• <strong>범위 검증:</strong> 페이지 변경 시 1 ≤ page ≤ totalPages 확인</div>
                    <div>• <strong>URL 동기화:</strong> 페이지 상태를 URL 파라미터로 관리</div>
                    <div>• <strong>키보드 지원:</strong> 방향키로 페이지 네비게이션 지원</div>
                  </>
                )}

                {activeComponent === 'tableRows' && (
                  <>
                    <div>• <strong>선택 관리:</strong> Set&lt;string&gt;으로 선택된 행 ID 관리</div>
                    <div>• <strong>상태 토글:</strong> data-state 속성으로 선택 상태 표시</div>
                    <div>• <strong>텍스트 잘림:</strong> CSS overflow: hidden + text-overflow: ellipsis</div>
                    <div>• <strong>가상화:</strong> 대량 데이터시 react-window 사용 고려</div>
                  </>
                  )}
              </div>
            </div>
          </div>

          {/* 변형(Variants) 정의 */}
          <div className='space-y-3'>
            <h4 className='font-medium'>피그마 변형(Variants) 정의</h4>
            <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
              <div className='text-sm text-purple-700 space-y-3'>
                {activeComponent === 'toolbar' && (
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div>
                      <p className='font-medium mb-1'>Size 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Mobile: 세로 스택 레이아웃</div>
                        <div>• Desktop: 가로 레이아웃</div>
                      </div>
                    </div>
                    <div>
                      <p className='font-medium mb-1'>State 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Default: 기본 상태</div>
                        <div>• Filtered: 필터 적용 시 리셋 버튼 표시</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeComponent === 'columnHeaders' && (
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div>
                      <p className='font-medium mb-1'>Type 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Sortable: 버튼 + 아이콘</div>
                        <div>• Text: 단순 텍스트</div>
                        <div>• Checkbox: 체크박스</div>
                        <div>• Empty: 빈 헤더</div>
                      </div>
                    </div>
                    <div>
                      <p className='font-medium mb-1'>Sort 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• None: ChevronsUpDown</div>
                        <div>• Asc: ChevronUp + accent</div>
                        <div>• Desc: ChevronDown + accent</div>
                      </div>
                    </div>
                    <div>
                      <p className='font-medium mb-1'>State 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Default: 기본 상태</div>
                        <div>• Active: 현재 정렬 컬럼</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeComponent === 'pagination' && (
                  <div className='grid gap-3 md:grid-cols-2'>
                    <div>
                      <p className='font-medium mb-1'>Size 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Mobile: 간소화된 레이아웃</div>
                        <div>• Tablet: 중간 레이아웃</div>
                        <div>• Desktop: 전체 레이아웃</div>
                      </div>
                    </div>
                    <div>
                      <p className='font-medium mb-1'>State 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• First Page: 이전 버튼 비활성</div>
                        <div>• Middle Page: 모든 버튼 활성</div>
                        <div>• Last Page: 다음 버튼 비활성</div>
                      </div>
                    </div>
                  </div>
                )}

                {activeComponent === 'tableRows' && (
                  <div className='grid gap-3 md:grid-cols-3'>
                    <div>
                      <p className='font-medium mb-1'>State 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Default: 기본 상태</div>
                        <div>• Hover: 호버 상태</div>
                        <div>• Selected: 선택된 상태</div>
                      </div>
                    </div>
                    <div>
                      <p className='font-medium mb-1'>Cell Type 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Checkbox: 체크박스 셀</div>
                        <div>• Text: 텍스트 셀</div>
                        <div>• Badge: 배지 + 텍스트</div>
                        <div>• Status: 아이콘 + 상태</div>
                        <div>• Action: 버튼 셀</div>
                      </div>
                    </div>
                    <div>
                      <p className='font-medium mb-1'>Status 변형</p>
                      <div className='text-xs space-y-1'>
                        <div>• Active: 녹색 아이콘</div>
                        <div>• Pending: 노란색 아이콘</div>
                        <div>• Inactive: 회색 아이콘</div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
)
}


        // 4단계: 반응형 및 디자인 토큰
function ResponsiveDesignSection() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<'mobile' | 'tablet' | 'desktop'>('desktop')

  const renderResponsiveDemo = () => {
    switch (currentBreakpoint) {
      case 'mobile':
        return (
          <div className='max-w-sm mx-auto border rounded-lg p-3'>
            <div className='space-y-3'>
              <div className='flex flex-col gap-2'>
                <Input placeholder="검색..." className="h-8 w-full" />
                <div className='flex gap-2'>
                  <Button variant="outline" size="sm" className="flex-1">필터</Button>
                  <Button variant="outline" size="sm" className="flex-1">옵션</Button>
                </div>
              </div>
              <div className='overflow-x-auto'>
                <table className='w-full text-xs'>
                  <thead>
                  <tr className='border-b'>
                    <th className='p-1 text-left'>이름</th>
                    <th className='p-1 text-left'>상태</th>
                  </tr>
                  </thead>
                  <tbody>
                  <tr className='border-b'>
                    <td className='p-1'>김철수</td>
                    <td className='p-1'>활성</td>
                  </tr>
                  <tr>
                    <td className='p-1'>이영희</td>
                    <td className='p-1'>대기</td>
                  </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )

      case 'tablet':
        return (
          <div className='max-w-md mx-auto border rounded-lg p-4'>
            <div className='space-y-3'>
              <div className='flex items-center gap-2'>
                <Input placeholder="검색..." className="h-8 w-48" />
                <Button variant="outline" size="sm">필터</Button>
                <Button variant="outline" size="sm">옵션</Button>
              </div>
              <table className='w-full text-sm'>
                <thead>
                <tr className='border-b'>
                  <th className='h-8 px-2 text-left'>이름</th>
                  <th className='h-8 px-2 text-left'>상태</th>
                  <th className='h-8 px-2 text-left'>액션</th>
                </tr>
                </thead>
                <tbody>
                <tr className='border-b hover:bg-muted/50'>
                  <td className='p-2'>김철수</td>
                  <td className='p-2'>활성</td>
                  <td className='p-2'>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <MoreHorizontal className="h-3 w-3" />
                    </Button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        )

      default:
        return (
          <div className='border rounded-lg p-4'>
            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <Input placeholder="사용자 검색..." className="h-8 w-64" />
                  <Button variant="outline" size="sm">상태</Button>
                  <Button variant="outline" size="sm">역할</Button>
                </div>
                <div className='flex items-center gap-2'>
                  <Button variant="outline" size="sm">내보내기</Button>
                  <Button variant="outline" size="sm">컬럼</Button>
                </div>
              </div>
              <table className='w-full text-sm'>
                <thead>
                <tr className='border-b'>
                  <th className='h-10 px-2 text-left'>
                    <Checkbox className="translate-y-[2px]" />
                  </th>
                  <th className='h-10 px-2 text-left'>이름</th>
                  <th className='h-10 px-2 text-left'>상태</th>
                  <th className='h-10 px-2 text-left'>이메일</th>
                  <th className='h-10 px-2 text-left'></th>
                </tr>
                </thead>
                <tbody>
                <tr className='border-b hover:bg-muted/50'>
                  <td className='p-2'>
                    <Checkbox className="translate-y-[2px]" />
                  </td>
                  <td className='p-2 font-medium'>김철수</td>
                  <td className='p-2'>활성</td>
                  <td className='p-2'>kim@company.com</td>
                  <td className='p-2'>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
                </tbody>
              </table>
            </div>
          </div>
        )
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          📱 4단계: 반응형 디자인 및 디자인 토큰
          <Badge variant='secondary'>라이트 모드 전용</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h4 className='font-medium'>반응형 브레이크포인트 시연</h4>
          <p className='text-muted-foreground'>
            다양한 화면 크기에서 DataTable이 어떻게 적응하는지 확인하세요.
          </p>

          {/* 브레이크포인트 토글 */}
          <div className="flex flex-wrap gap-2">
            <Button
              variant={currentBreakpoint === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentBreakpoint('mobile')}
            >
              📱 모바일 (≤640px)
            </Button>
            <Button
              variant={currentBreakpoint === 'tablet' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentBreakpoint('tablet')}
            >
              📟 태블릿 (640px-1024px)
            </Button>
            <Button
              variant={currentBreakpoint === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setCurrentBreakpoint('desktop')}
            >
              💻 데스크톱 (≥1024px)
            </Button>
          </div>

          {/* 반응형 데모 */}
          {renderResponsiveDemo()}

          <Separator />

          {/* 디자인 토큰 정리 */}
          <div className='space-y-4'>
            <h4 className='font-medium'>라이트 모드 디자인 토큰</h4>

            <div className='grid gap-6 md:grid-cols-2'>
              <div className='space-y-4'>
                <h5 className='font-medium text-sm'>색상 시스템</h5>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-foreground rounded'></div>
                    <code className='text-sm'>foreground</code>
                    <span className='text-xs text-muted-foreground'>기본 텍스트</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-muted-foreground rounded'></div>
                    <code className='text-sm'>muted-foreground</code>
                    <span className='text-xs text-muted-foreground'>보조 텍스트</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 bg-muted rounded border'></div>
                    <code className='text-sm'>muted</code>
                    <span className='text-xs text-muted-foreground'>호버/선택 배경</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-4 h-4 border rounded'></div>
                    <code className='text-sm'>border</code>
                    <span className='text-xs text-muted-foreground'>테두리</span>
                  </div>
                </div>
              </div>

              <div className='space-y-4'>
                <h5 className='font-medium text-sm'>간격 시스템</h5>
                <div className='space-y-3'>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-2 bg-muted rounded'></div>
                    <code className='text-sm'>p-2</code>
                    <span className='text-xs text-muted-foreground'>8px 패딩</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-4 bg-muted rounded'></div>
                    <code className='text-sm'>h-8</code>
                    <span className='text-xs text-muted-foreground'>32px 높이</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-5 bg-muted rounded'></div>
                    <code className='text-sm'>h-10</code>
                    <span className='text-xs text-muted-foreground'>40px 높이</span>
                  </div>
                  <div className='flex items-center gap-3'>
                    <div className='w-2 h-1 bg-muted rounded'></div>
                    <code className='text-sm'>space-y-4</code>
                    <span className='text-xs text-muted-foreground'>16px 수직 간격</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
              <h5 className='font-medium text-blue-800 mb-2'>CSS 변수 활용</h5>
              <div className='text-sm text-blue-700 space-y-1'>
                <div>• <code>var(--muted)</code> - 호버/선택 배경색</div>
                <div>• <code>var(--border)</code> - 테두리 색상</div>
                <div>• <code>var(--foreground)</code> - 텍스트 색상</div>
                <div>• <code>var(--muted-foreground)</code> - 보조 텍스트</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 피그마 컴포넌트 설계 가이드
// 피그마 컴포넌트 설계 가이드 (완전한 버전)
// 피그마 컴포넌트 설계 가이드 (DataTable 전용)
function FigmaDesignGuide() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🎨 DataTable 피그마 컴포넌트 설계 가이드
          <Badge variant='secondary'>실제 구현 기준</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-8'>

        {/* 1. Toolbar 영역 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>1. Toolbar 영역</h3>

          {/* Toolbar 온전한 예시 */}
          <div className='bg-white border rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-blue-700'>Toolbar 완전한 예시</h4>

            <div className='space-y-4'>
              {/* 툴바만 있는 완전한 테이블 */}
              <div className='space-y-3'>
                <div className='flex items-center justify-between'>
                  <div className='flex flex-1 items-center space-x-2'>
                    <div className="relative">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="사용자 검색..."
                        className="h-8 w-[150px] lg:w-[250px] pl-8"
                      />
                    </div>
                    <Select defaultValue="all">
                      <SelectTrigger className="h-8 w-[100px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">모든 상태</SelectItem>
                        <SelectItem value="active">활성</SelectItem>
                        <SelectItem value="pending">대기</SelectItem>
                        <SelectItem value="inactive">비활성</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="ghost" className="h-8 px-2 lg:px-3">
                      리셋 ✕
                    </Button>
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

                <div className='relative w-full overflow-x-auto'>
                  <table className='w-full caption-bottom text-sm'>
                    <thead className='[&_tr]:border-b'>
                    <tr>
                      <th className='h-10 px-2 text-left align-middle font-medium'>이름</th>
                      <th className='h-10 px-2 text-left align-middle font-medium'>상태</th>
                      <th className='h-10 px-2 text-left align-middle font-medium'>이메일</th>
                    </tr>
                    </thead>
                    <tbody className='[&_tr:last-child]:border-0'>
                    <tr className='border-b'>
                      <td className='p-2 align-middle'>김철수</td>
                      <td className='p-2 align-middle'>활성</td>
                      <td className='p-2 align-middle'>kim@company.com</td>
                    </tr>
                    <tr className='border-b'>
                      <td className='p-2 align-middle'>이영희</td>
                      <td className='p-2 align-middle'>대기</td>
                      <td className='p-2 align-middle'>lee@company.com</td>
                    </tr>
                    <tr>
                      <td className='p-2 align-middle'>박민수</td>
                      <td className='p-2 align-middle'>비활성</td>
                      <td className='p-2 align-middle'>park@company.com</td>
                    </tr>
                    </tbody>
                  </table>
                </div>

                <div className='flex items-center justify-between px-2'>
                  <div className='text-muted-foreground text-sm'>0 / 3 행이 선택됨</div>
                  <div className='flex items-center space-x-6'>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium">페이지당 행 수</span>
                      <Select defaultValue="10">
                        <SelectTrigger className="h-8 w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                      </Select>
                    </div>
                    <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                      1 / 1 페이지
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" className="h-8 w-8 p-0" disabled>«</Button>
                      <Button variant="outline" className="h-8 w-8 p-0" disabled>»</Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toolbar 피그마 구조 */}
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>DataTable_Toolbar 컴포넌트 구조</h4>
            <div className='space-y-3'>
              <div><strong>Frame:</strong> "DataTable_Toolbar"</div>
              <div><strong>Auto Layout:</strong> Horizontal, Space Between, Center alignment</div>
              <div><strong>Fill:</strong> Fill container</div>

              <div className='ml-4 space-y-2'>
                <div><strong>Left_Group (Fill container):</strong></div>
                <div className='ml-4'>- Search_Input (기존 Input 컴포넌트 + Search 아이콘)</div>
                <div className='ml-4'>- Filter_Select (기존 Select 컴포넌트)</div>
                <div className='ml-4'>- Reset_Button (기존 Button 컴포넌트)</div>

                <div><strong>Right_Group (Hug contents):</strong></div>
                <div className='ml-4'>- Export_Button (기존 Button 컴포넌트)</div>
                <div className='ml-4'>- Column_Button (기존 Button 컴포넌트)</div>
              </div>

              <div><strong>Variants:</strong></div>
              <div className='ml-4'>- Size: Mobile / Desktop</div>
              <div className='ml-4'>- HasFilters: Boolean (Reset 버튼 표시)</div>

              <div><strong>Properties:</strong></div>
              <div className='ml-4'>- SearchPlaceholder: String</div>
              <div className='ml-4'>- FilterValue: String</div>
              <div className='ml-4'>- ShowReset: Boolean</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 2. Column Headers 영역 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>2. Column Headers 영역</h3>

          {/* Column Headers 온전한 예시 */}
          <div className='bg-white border rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-green-700'>Column Headers 완전한 예시</h4>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-1 items-center space-x-2'>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="사용자 검색..."
                      className="h-8 w-[150px] lg:w-[250px] pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">내보내기</Button>
                </div>
              </div>

              {/* 헤더에 집중된 테이블 */}
              <div className='relative w-full overflow-x-auto'>
                <table className='w-full caption-bottom text-sm'>
                  <thead className='[&_tr]:border-b bg-muted/20'>
                  <tr>
                    <th className='h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8">
                        <span>이름</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 bg-accent">
                        <span>상태</span>
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      이메일
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      {/* 빈 헤더 */}
                    </th>
                  </tr>
                  </thead>
                  <tbody className='[&_tr:last-child]:border-0'>
                  <tr className='border-b'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </td>
                    <td className='p-2 align-middle'>김철수</td>
                    <td className='p-2 align-middle'>활성</td>
                    <td className='p-2 align-middle'>kim@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" checked />
                    </td>
                    <td className='p-2 align-middle'>이영희</td>
                    <td className='p-2 align-middle'>대기</td>
                    <td className='p-2 align-middle'>lee@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </td>
                    <td className='p-2 align-middle'>박민수</td>
                    <td className='p-2 align-middle'>비활성</td>
                    <td className='p-2 align-middle'>park@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div className='flex items-center justify-between px-2'>
                <div className='text-muted-foreground text-sm'>1 / 3 행이 선택됨</div>
                <div className='flex items-center space-x-6'>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">페이지당 행 수</span>
                    <Select defaultValue="10">
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                    </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    1 / 1 페이지
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="h-8 w-8 p-0" disabled>«</Button>
                    <Button variant="outline" className="h-8 w-8 p-0" disabled>»</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Column Headers 피그마 구조 */}
          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>DataTable_ColumnHeader 컴포넌트 구조</h4>
            <div className='space-y-3'>
              <div><strong>Frame:</strong> "DataTable_ColumnHeader"</div>
              <div><strong>Base:</strong> h-10 px-2 text-left align-middle font-medium</div>

              <div><strong>Type Variants:</strong></div>
              <div className='ml-4 space-y-2'>
                <div><strong>Sortable:</strong> 기존 Button 컴포넌트 (ghost, sm) + 정렬 아이콘</div>
                <div className='ml-8'>- Button 스타일: -ml-3 h-8</div>
                <div className='ml-8'>- 아이콘: ChevronsUpDown / ChevronUp / ChevronDown</div>
                <div className='ml-8'>- 활성 상태: bg-accent</div>

                <div><strong>Text:</strong> 단순 텍스트</div>
                <div className='ml-8'>- 정렬 불가능한 컬럼용</div>

                <div><strong>Checkbox:</strong> 기존 Checkbox 컴포넌트</div>
                <div className='ml-8'>- 특수 스타일: [&:has([role=checkbox])]:pr-0</div>
                <div className='ml-8'>- 위치 조정: translate-y-[2px]</div>

                <div><strong>Empty:</strong> 빈 헤더</div>
                <div className='ml-8'>- 액션 컬럼용</div>
              </div>

              <div><strong>Sort State (Sortable 전용):</strong></div>
              <div className='ml-4'>- None: ChevronsUpDown</div>
              <div className='ml-4'>- Asc: ChevronUp + bg-accent</div>
              <div className='ml-4'>- Desc: ChevronDown + bg-accent</div>

              <div><strong>Properties:</strong></div>
              <div className='ml-4'>- HeaderText: String</div>
              <div className='ml-4'>- IsActive: Boolean</div>
              <div className='ml-4'>- SortDirection: none / asc / desc</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 3. Table Rows & Cells 영역 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>3. Table Rows & Cells 영역</h3>

          {/* Table Rows 온전한 예시 */}
          <div className='bg-white border rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-orange-700'>Table Rows & Cells 완전한 예시</h4>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-1 items-center space-x-2'>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="사용자 검색..."
                      className="h-8 w-[150px] lg:w-[250px] pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">내보내기</Button>
                </div>
              </div>

              {/* 행과 셀에 집중된 테이블 */}
              <div className='relative w-full overflow-x-auto'>
                <table className='w-full caption-bottom text-sm'>
                  <thead className='[&_tr]:border-b'>
                  <tr>
                    <th className='h-10 px-2 text-left align-middle font-medium'>선택</th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>사용자</th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>상태</th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>이메일</th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>액션</th>
                  </tr>
                  </thead>
                  <tbody className='[&_tr:last-child]:border-0'>
                  {/* 일반 행 */}
                  <tr className='border-b hover:bg-muted/50 transition-colors'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex space-x-2">
                        <Badge variant="outline">개발팀</Badge>
                        <span className="max-w-32 truncate font-medium">김철수</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex w-[100px] items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>활성</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>kim@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>

                  {/* 선택된 행 */}
                  <tr className='border-b bg-muted transition-colors'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" checked />
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex space-x-2">
                        <Badge variant="outline">디자인팀</Badge>
                        <span className="max-w-32 truncate font-medium">이영희</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex w-[100px] items-center">
                        <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>대기</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>lee@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>

                  {/* 마지막 행 (테두리 없음) */}
                  <tr className='hover:bg-muted/50 transition-colors'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex space-x-2">
                        <Badge variant="outline">기획팀</Badge>
                        <span className="max-w-32 truncate font-medium">박민수</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex w-[100px] items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-gray-500" />
                        <span>비활성</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>park@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div className='flex items-center justify-between px-2'>
                <div className='text-muted-foreground text-sm'>1 / 3 행이 선택됨</div>
                <div className='flex items-center space-x-6'>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">페이지당 행 수</span>
                    <Select defaultValue="10">
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                    </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    1 / 1 페이지
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="h-8 w-8 p-0" disabled>«</Button>
                    <Button variant="outline" className="h-8 w-8 p-0" disabled>»</Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Table Rows 피그마 구조 */}
          <div className='bg-orange-50 border border-orange-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>DataTable_Row 컴포넌트 구조</h4>
            <div className='space-y-3'>
              <div><strong>Frame:</strong> "DataTable_Row"</div>
              <div><strong>Auto Layout:</strong> Horizontal, Spacing 0, Fill container</div>
              <div><strong>Base 스타일:</strong> border-b transition-colors</div>

              <div><strong>Row State Variants:</strong></div>
              <div className='ml-4'>- Default: 기본 투명 배경</div>
              <div className='ml-4'>- Hover: hover:bg-muted/50</div>
              <div className='ml-4'>- Selected: data-[state=selected]:bg-muted</div>

              <div><strong>Cell Types (각각 기존 컴포넌트 활용):</strong></div>
              <div className='ml-4 space-y-2'>
                <div><strong>Checkbox_Cell:</strong></div>
                <div className='ml-8'>- 기존 Checkbox 컴포넌트</div>
                <div className='ml-8'>- 스타일: [&:has([role=checkbox])]:pr-0, translate-y-[2px]</div>

                <div><strong>BadgeText_Cell:</strong></div>
                <div className='ml-8'>- 기존 Badge 컴포넌트 + Text</div>
                <div className='ml-8'>- Layout: flex space-x-2</div>
                <div className='ml-8'>- Text: max-w-32 truncate font-medium</div>

                <div><strong>Status_Cell:</strong></div>
                <div className='ml-8'>- 아이콘 + Text 조합</div>
                <div className='ml-8'>- Layout: flex w-[100px] items-center</div>
                <div className='ml-8'>- 아이콘: CheckCircle/Clock/AlertCircle (16px)</div>

                <div><strong>Text_Cell:</strong></div>
                <div className='ml-8'>- 단순 텍스트</div>
                <div className='ml-8'>- 스타일: p-2 align-middle whitespace-nowrap</div>

                <div><strong>Action_Cell:</strong></div>
                <div className='ml-8'>- 기존 Button 컴포넌트 (ghost, icon)</div>
                <div className='ml-8'>- 크기: h-8 w-8</div>
              </div>

              <div><strong>Properties:</strong></div>
              <div className='ml-4'>- IsSelected: Boolean</div>
              <div className='ml-4'>- UserName: String</div>
              <div className='ml-4'>- Department: String</div>
              <div className='ml-4'>- Status: Active/Pending/Inactive</div>
              <div className='ml-4'>- Email: String</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 4. Pagination 영역 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>4. Pagination 영역</h3>

          {/* Pagination 온전한 예시 */}
          <div className='bg-white border rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-purple-700'>Pagination 완전한 예시</h4>

            <div className='space-y-4'>
              <div className='flex items-center justify-between'>
                <div className='flex flex-1 items-center space-x-2'>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="사용자 검색..."
                      className="h-8 w-[150px] lg:w-[250px] pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                  </Select>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="outline" size="sm">내보내기</Button>
                </div>
              </div>

              <div className='relative w-full overflow-x-auto'>
                <table className='w-full caption-bottom text-sm'>
                  <thead className='[&_tr]:border-b'>
                  <tr>
                    <th className='h-10 px-2 text-left align-middle font-medium'>이름</th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>상태</th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>이메일</th>
                  </tr>
                  </thead>
                  <tbody className='[&_tr:last-child]:border-0'>
                  <tr className='border-b'>
                    <td className='p-2 align-middle'>김철수</td>
                    <td className='p-2 align-middle'>활성</td>
                    <td className='p-2 align-middle'>kim@company.com</td>
                  </tr>
                  <tr className='border-b'>
                    <td className='p-2 align-middle'>이영희</td>
                    <td className='p-2 align-middle'>대기</td>
                    <td className='p-2 align-middle'>lee@company.com</td>
                  </tr>
                  <tr>
                    <td className='p-2 align-middle'>박민수</td>
                    <td className='p-2 align-middle'>비활성</td>
                    <td className='p-2 align-middle'>park@company.com</td>
                  </tr>
                  </tbody>
                </table>
              </div>

              {/* 페이지네이션에 집중 */}
              <div className='flex items-center justify-between overflow-clip px-2'>
                <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
                  2 / 3 행이 선택됨
                </div>
                <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                  <div className="flex items-center space-x-2">
                    <span className="hidden text-sm font-medium sm:block">페이지당 행 수</span>
                    <Select defaultValue="10">
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    2 / 5 페이지
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
                      ««
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0">
                      «
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0">
                      »
                    </Button>
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex">
                      »»
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pagination 피그마 구조 */}
          <div className='bg-purple-50 border border-purple-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>DataTable_Pagination 컴포넌트 구조</h4>
            <div className='space-y-3'>
              <div><strong>Frame:</strong> "DataTable_Pagination"</div>
              <div><strong>Auto Layout:</strong> Horizontal, Space Between, Center alignment</div>
              <div><strong>Fill:</strong> Fill container</div>
              <div><strong>Padding:</strong> px-2</div>

              <div><strong>Left_Section:</strong></div>
              <div className='ml-4'>- Selection_Info (flex-1)</div>
              <div className='ml-4'>- Text: "X / Y 행이 선택됨"</div>
              <div className='ml-4'>- 반응형: hidden sm:block</div>

              <div><strong>Right_Section:</strong></div>
              <div className='ml-4 space-y-2'>
                <div><strong>PageSize_Control:</strong></div>
                <div className='ml-8'>- Label: "페이지당 행 수" (hidden sm:block)</div>
                <div className='ml-8'>- 기존 Select 컴포넌트 (h-8 w-[70px], side="top")</div>

                <div><strong>Page_Info:</strong></div>
                <div className='ml-8'>- Text: "X / Y 페이지"</div>
                <div className='ml-8'>- Container: w-[100px] justify-center</div>

                <div><strong>Navigation_Buttons:</strong></div>
                <div className='ml-8'>- 4개 기존 Button 컴포넌트 (outline, h-8 w-8 p-0)</div>
                <div className='ml-8'>- 첫/마지막: hidden lg:flex</div>
                <div className='ml-8'>- 아이콘: ««, «, », »»</div>
              </div>

              <div><strong>Responsive Variants:</strong></div>
              <div className='ml-4'>- Mobile: 선택 정보 숨김, 라벨 숨김, 첫/마지막 버튼 숨김</div>
              <div className='ml-4'>- Tablet: 선택 정보 표시, 간격 sm:space-x-6</div>
              <div className='ml-4'>- Desktop: 모든 요소 표시, 간격 lg:space-x-8</div>

              <div><strong>State Variants:</strong></div>
              <div className='ml-4'>- FirstPage: 이전 버튼들 disabled</div>
              <div className='ml-4'>- MiddlePage: 모든 버튼 enabled</div>
              <div className='ml-4'>- LastPage: 다음 버튼들 disabled</div>

              <div><strong>Properties:</strong></div>
              <div className='ml-4'>- SelectedCount: Number</div>
              <div className='ml-4'>- TotalCount: Number</div>
              <div className='ml-4'>- CurrentPage: Number</div>
              <div className='ml-4'>- TotalPages: Number</div>
              <div className='ml-4'>- PageSize: Number</div>
              <div className='ml-4'>- CanGoPrevious: Boolean</div>
              <div className='ml-4'>- CanGoNext: Boolean</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 5. 전체 DataTable 컨테이너 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>5. 전체 DataTable 컨테이너</h3>

          {/* 완전한 DataTable 예시 */}
          <div className='bg-white border rounded-lg p-4'>
            <h4 className='font-medium mb-3 text-indigo-700'>완전한 DataTable 예시</h4>

            <div className='space-y-4'>
              {/* 완전한 테이블 */}
              <div className='flex items-center justify-between'>
                <div className='flex flex-1 items-center space-x-2'>
                  <div className="relative">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="사용자 검색..."
                      className="h-8 w-[150px] lg:w-[250px] pl-8"
                    />
                  </div>
                  <Select defaultValue="all">
                    <SelectTrigger className="h-8 w-[100px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">모든 상태</SelectItem>
                      <SelectItem value="active">활성</SelectItem>
                      <SelectItem value="pending">대기</SelectItem>
                      <SelectItem value="inactive">비활성</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="ghost" className="h-8 px-2 lg:px-3">
                    리셋 ✕
                  </Button>
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

              <div className='relative w-full overflow-x-auto'>
                <table className='w-full caption-bottom text-sm'>
                  <thead className='[&_tr]:border-b'>
                  <tr>
                    <th className='h-10 px-2 text-left align-middle font-medium [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8">
                        <span>이름</span>
                        <ChevronsUpDown className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      <Button variant="ghost" size="sm" className="-ml-3 h-8 bg-accent">
                        <span>상태</span>
                        <ChevronUp className="ml-2 h-4 w-4" />
                      </Button>
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      이메일
                    </th>
                    <th className='h-10 px-2 text-left align-middle font-medium'>
                      {/* 액션 컬럼 빈 헤더 */}
                    </th>
                  </tr>
                  </thead>
                  <tbody className='[&_tr:last-child]:border-0'>
                  <tr className='border-b hover:bg-muted/50 transition-colors'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex space-x-2">
                        <Badge variant="outline">개발팀</Badge>
                        <span className="max-w-32 truncate font-medium">김철수</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex w-[100px] items-center">
                        <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
                        <span>활성</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>kim@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className='border-b bg-muted transition-colors'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" checked />
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex space-x-2">
                        <Badge variant="outline">디자인팀</Badge>
                        <span className="max-w-32 truncate font-medium">이영희</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex w-[100px] items-center">
                        <Clock className="mr-2 h-4 w-4 text-yellow-500" />
                        <span>대기</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>lee@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  <tr className='hover:bg-muted/50 transition-colors'>
                    <td className='p-2 align-middle [&:has([role=checkbox])]:pr-0'>
                      <Checkbox className="translate-y-[2px]" />
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex space-x-2">
                        <Badge variant="outline">기획팀</Badge>
                        <span className="max-w-32 truncate font-medium">박민수</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>
                      <div className="flex w-[100px] items-center">
                        <AlertCircle className="mr-2 h-4 w-4 text-gray-500" />
                        <span>비활성</span>
                      </div>
                    </td>
                    <td className='p-2 align-middle'>park@company.com</td>
                    <td className='p-2 align-middle'>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                  </tbody>
                </table>
              </div>

              <div className='flex items-center justify-between overflow-clip px-2'>
                <div className='text-muted-foreground hidden flex-1 text-sm sm:block'>
                  1 / 3 행이 선택됨
                </div>
                <div className='flex items-center sm:space-x-6 lg:space-x-8'>
                  <div className="flex items-center space-x-2">
                    <span className="hidden text-sm font-medium sm:block">페이지당 행 수</span>
                    <Select defaultValue="10">
                      <SelectTrigger className="h-8 w-[70px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent side="top">
                        <SelectItem value="5">5</SelectItem>
                        <SelectItem value="10">10</SelectItem>
                        <SelectItem value="20">20</SelectItem>
                        <SelectItem value="50">50</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex w-[100px] items-center justify-center text-sm font-medium">
                    1 / 1 페이지
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" disabled>
                      ««
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" disabled>
                      «
                    </Button>
                    <Button variant="outline" className="h-8 w-8 p-0" disabled>
                      »
                    </Button>
                    <Button variant="outline" className="hidden h-8 w-8 p-0 lg:flex" disabled>
                      »»
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* DataTable 전체 구조 */}
          <div className='bg-indigo-50 border border-indigo-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>DataTable_Container 마스터 컴포넌트</h4>
            <div className='space-y-3'>
              <div><strong>Frame:</strong> "DataTable_Container"</div>
              <div><strong>Auto Layout:</strong> Vertical, Spacing: 16px</div>
              <div><strong>Fill:</strong> Fill container</div>

              <div><strong>구조 (수직 배치):</strong></div>
              <div className='ml-4 space-y-1'>
                <div>1️⃣ DataTable_Toolbar 인스턴스</div>
                <div>2️⃣ Table_Wrapper</div>
                <div className='ml-4'>- Container: relative w-full overflow-x-auto</div>
                <div className='ml-4'>- Table: w-full caption-bottom text-sm ⭐</div>
                <div className='ml-8'>- THead: [&_tr]:border-b</div>
                <div className='ml-12'>└── DataTable_ColumnHeader 인스턴스들</div>
                <div className='ml-8'>- TBody: [&_tr:last-child]:border-0</div>
                <div className='ml-12'>└── DataTable_Row 인스턴스들</div>
                <div>3️⃣ DataTable_Pagination 인스턴스</div>
              </div>

              <div><strong>핵심 CSS 클래스:</strong></div>
              <div className='ml-4 space-y-1 text-sm'>
                <div><strong>Container:</strong> relative w-full overflow-x-auto</div>
                <div><strong>Table:</strong> w-full caption-bottom text-sm ⭐ (모든 하위 요소 14px 상속)</div>
                <div><strong>THead:</strong> [&_tr]:border-b</div>
                <div><strong>TBody:</strong> [&_tr:last-child]:border-0</div>
                <div><strong>TR:</strong> hover:bg-muted/50 data-[state=selected]:bg-muted border-b transition-colors</div>
              </div>

              <div><strong>Feature Variants:</strong></div>
              <div className='ml-4'>- Basic: 기본 테이블 (정렬/선택 없음)</div>
              <div className='ml-4'>- WithSelection: 체크박스 선택 기능</div>
              <div className='ml-4'>- WithSorting: 컬럼 정렬 기능</div>
              <div className='ml-4'>- WithFiltering: 검색/필터 기능</div>
              <div className='ml-4'>- Full: 모든 기능 포함</div>

              <div><strong>Size Variants:</strong></div>
              <div className='ml-4'>- Mobile: 축약된 UI, 일부 기능 숨김</div>
              <div className='ml-4'>- Tablet: 중간 기능, 일부 요소 숨김</div>
              <div className='ml-4'>- Desktop: 전체 기능 표시</div>

              <div><strong>Data State Variants:</strong></div>
              <div className='ml-4'>- Empty: 데이터 없음 상태</div>
              <div className='ml-4'>- Loading: 로딩 스피너 표시</div>
              <div className='ml-4'>- Error: 에러 메시지 표시</div>
              <div className='ml-4'>- Populated: 정상 데이터 표시</div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 6. 디자인 토큰 및 스타일 시스템 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>6. 디자인 토큰 및 스타일 시스템</h3>

          <div className='bg-slate-50 border border-slate-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>DataTable 전용 토큰 매핑</h4>

            <div className='grid gap-4 md:grid-cols-2'>
              <div className='space-y-3'>
                <h5 className='font-medium'>Typography</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <code className='bg-red-100 px-2 py-1 rounded text-xs'>text-sm (14px)</code>
                    <span>→ Table 전역 폰트 크기 (⭐ 핵심)</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>font-medium (500)</code>
                    <span>→ 헤더 폰트 weight</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>font-normal (400)</code>
                    <span>→ 셀 폰트 weight</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium'>Heights</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>h-8 (32px)</code>
                    <span>→ 컨트롤 요소 높이</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>h-10 (40px)</code>
                    <span>→ 테이블 헤더 높이</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium'>Spacing</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>p-2 (8px)</code>
                    <span>→ 셀 패딩</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>px-2 (8px)</code>
                    <span>→ 헤더 가로 패딩</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>space-x-2 (8px)</code>
                    <span>→ 컨트롤 간격</span>
                  </div>
                </div>
              </div>

              <div className='space-y-3'>
                <h5 className='font-medium'>Colors</h5>
                <div className='space-y-2 text-sm'>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-foreground rounded'></div>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>text-foreground</code>
                    <span>→ 기본 텍스트</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-muted rounded border'></div>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>bg-muted</code>
                    <span>→ 선택/호버 배경</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 bg-accent rounded'></div>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>bg-accent</code>
                    <span>→ 활성 상태</span>
                  </div>
                  <div className='flex items-center gap-2'>
                    <div className='w-4 h-4 border rounded'></div>
                    <code className='bg-slate-100 px-2 py-1 rounded text-xs'>border</code>
                    <span>→ 테두리 색상</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* 7. 구현 가이드라인 */}
        <div className='space-y-4'>
          <h3 className='text-lg font-semibold'>7. 구현 가이드라인</h3>

          <div className='bg-amber-50 border border-amber-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>⚠️ 중요한 구현 포인트</h4>
            <div className='space-y-2 text-sm'>
              <div><strong>1. 폰트 크기 상속:</strong></div>
              <div className='ml-4'>- table 요소의 text-sm(14px)이 모든 하위 요소에 자동 상속</div>
              <div className='ml-4'>- th, td 요소에는 별도 폰트 크기 선언하지 않음</div>

              <div><strong>2. 기존 컴포넌트 재사용:</strong></div>
              <div className='ml-4'>- Button, Input, Select, Checkbox, Badge 컴포넌트 그대로 사용</div>
              <div className='ml-4'>- 각 컴포넌트의 variants와 props 활용</div>

              <div><strong>3. CSS 선택자 패턴:</strong></div>
              <div className='ml-4'>- [&_tr]:border-b → 하위 모든 tr에 테두리</div>
              <div className='ml-4'>- [&:has([role=checkbox])]:pr-0 → 체크박스 포함 시 우측 패딩 제거</div>
              <div className='ml-4'>- data-[state=selected]:bg-muted → 데이터 속성 기반 스타일링</div>

              <div><strong>4. 반응형 구현:</strong></div>
              <div className='ml-4'>- Mobile-first 접근법</div>
              <div className='ml-4'>- sm: (640px), lg: (1024px) 브레이크포인트</div>
              <div className='ml-4'>- hidden/block 토글로 요소 표시/숨김</div>
            </div>
          </div>

          <div className='bg-green-50 border border-green-200 rounded-lg p-4'>
            <h4 className='font-medium mb-3'>✅ 피그마 → 개발 핸드오프 체크리스트</h4>
            <div className='space-y-2 text-sm'>
              <div>□ 모든 컴포넌트의 Variants 정의 완료</div>
              <div>□ Properties 타입과 기본값 설정</div>
              <div>□ 반응형 브레이크포인트별 Variants 생성</div>
              <div>□ 상태별 스타일 (Default, Hover, Selected) 정의</div>
              <div>□ 기존 디자인 시스템 컴포넌트와의 일관성 확인</div>
              <div>□ 접근성 속성 (role, aria-*) 명시</div>
              <div>□ 컴포넌트 간 의존성 관계 문서화</div>
              <div>□ CSS 클래스명과 피그마 토큰 매핑표 작성</div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

// 마지막: 종합 요약 및 다음 단계
function SummarySection() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className='flex items-center gap-2'>
          🎯 종합 요약 및 다음 단계
          <Badge variant='secondary'>완료</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className='space-y-6'>
        <div className='space-y-4'>
          <h4 className='font-medium'>구현 완료 체크리스트</h4>
          <div className='grid gap-4 md:grid-cols-2'>
            <div className='space-y-3'>
              <h5 className='font-medium text-sm'>✅ 완료된 항목</h5>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>기본 테이블 구조 및 스타일링</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>인터랙티브 기능 (정렬, 필터링, 페이지네이션)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>상태별 UI (로딩, 에러, 빈 데이터)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>반응형 디자인</span>
                </div>
                <div className='flex items-center gap-2'>
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span>디자인 토큰 정의</span>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              <h5 className='font-medium text-sm'>🚀 추가 개선 사항</h5>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>드래그 앤 드롭으로 컬럼 순서 변경</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>컬럼 크기 조절 (resize)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>고급 필터링 (날짜 범위, 다중 선택)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>사용자 설정 저장 (LocalStorage)</span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className="h-4 w-4 text-yellow-500" />
                  <span>실시간 데이터 업데이트 (WebSocket)</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        <div className='space-y-4'>
          <h4 className='font-medium'>피그마 디자인 시스템 등록 가이드</h4>
          <div className='grid gap-4 md:grid-cols-3'>
            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600'>1</div>
                <span className='font-medium text-sm'>컴포넌트 분리</span>
              </div>
              <p className='text-xs text-muted-foreground ml-10'>
                각 요소를 개별 컴포넌트로 분리하여 재사용 가능하게 구성
              </p>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600'>2</div>
                <span className='font-medium text-sm'>속성 정의</span>
              </div>
              <p className='text-xs text-muted-foreground ml-10'>
                각 상태별 속성과 변형(Variants)을 정의하고 문서화
              </p>
            </div>

            <div className='space-y-2'>
              <div className='flex items-center gap-2'>
                <div className='w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium text-blue-600'>3</div>
                <span className='font-medium text-sm'>토큰 연결</span>
              </div>
              <p className='text-xs text-muted-foreground ml-10'>
                디자인 토큰을 컴포넌트에 연결하여 일관성 확보
              </p>
            </div>
          </div>
        </div>

        <Separator />

        <div className='space-y-4'>
          <h4 className='font-medium'>개발팀 핸드오프</h4>
          <div className='bg-blue-50 border border-blue-200 rounded-lg p-4'>
            <h5 className='font-medium text-blue-800 mb-3'>전달 사항</h5>
            <div className='text-sm text-blue-700 space-y-2'>
              <div>• <strong>컴포넌트 사용법:</strong> 이 문서의 모든 예시 코드는 복사하여 바로 사용 가능</div>
              <div>• <strong>커스터마이징:</strong> className props로 스타일 오버라이드 가능</div>
              <div>• <strong>타입 안전성:</strong> TypeScript로 모든 props 타입 정의됨</div>
              <div>• <strong>성능:</strong> 메모이제이션과 가상화 적용으로 대용량 데이터 처리 가능</div>
              <div>• <strong>접근성:</strong> WCAG 2.1 AA 기준 준수, 키보드 탐색 지원</div>
            </div>
          </div>
        </div>

        <Separator />

        <div className='text-center space-y-2'>
          <h4 className='font-medium text-lg'>🎉 DataTable 디자인 시스템 완성!</h4>
          <p className='text-muted-foreground'>
            실제 동작하는 모든 기능과 상태가 포함된 완전한 가이드입니다.
          </p>
          <div className='flex justify-center gap-2 mt-4'>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              피그마 파일 다운로드
            </Button>
            <Button variant="outline">
              <Settings className="mr-2 h-4 w-4" />
              개발 가이드 보기
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}