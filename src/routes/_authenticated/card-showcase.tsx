import { createFileRoute } from '@tanstack/react-router'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { TopNav } from '@/components/layout/top-nav'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardAction, CardFooter } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Settings, MoreHorizontal, User, Heart, Share } from 'lucide-react'

export const Route = createFileRoute('/_authenticated/card-showcase')({
  component: CardShowcase,
})

function CardShowcase() {
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
            <h1 className='text-3xl font-bold tracking-tight'>Card Component Showcase</h1>
            <p className='text-muted-foreground mt-2'>
              Card 컴포넌트의 구조, CSS 클래스, 사용 예시 상세 분석
            </p>
          </div>

          {/* Card 구조 분석 */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Card 구조 분석
                <Badge variant='secondary'>shadcn/ui</Badge>
              </CardTitle>
              <CardDescription>
                Card의 각 서브 컴포넌트와 CSS 클래스 분석
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>

              {/* 실제 카드로 영역 시각화 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>1. 영역별 구분 시각화</h3>
                <Card className='relative'>
                  {/* Header 영역 표시 */}
                  <CardHeader className='bg-blue-50 dark:bg-blue-950 border-2 border-blue-300 border-dashed'>
                    <div className='absolute -top-6 left-0 bg-blue-600 text-white px-2 py-1 rounded text-xs font-bold'>
                      CardHeader 영역
                    </div>
                    <CardTitle className='bg-green-100 dark:bg-green-900 p-2 rounded border border-green-300'>
                      <span className='text-xs bg-green-600 text-white px-1 rounded'>CardTitle</span>
                      Card 제목 영역
                    </CardTitle>
                    <CardDescription className='bg-yellow-100 dark:bg-yellow-900 p-2 rounded border border-yellow-300'>
                      <span className='text-xs bg-yellow-600 text-white px-1 rounded'>CardDescription</span>
                      Card 설명 영역 (선택적)
                    </CardDescription>
                    <CardAction className='bg-purple-100 dark:bg-purple-900 p-2 rounded border border-purple-300'>
                      <span className='text-xs bg-purple-600 text-white px-1 rounded'>CardAction</span>
                      <Button variant='ghost' size='sm'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </CardAction>
                  </CardHeader>

                  {/* Content 영역 표시 */}
                  <CardContent className='bg-orange-50 dark:bg-orange-950 border-2 border-orange-300 border-dashed relative'>
                    <div className='absolute -top-6 left-0 bg-orange-600 text-white px-2 py-1 rounded text-xs font-bold'>
                      CardContent 영역
                    </div>
                    <p className='text-sm'>여기가 실제 콘텐츠가 들어가는 영역입니다.</p>
                    <p className='text-xs text-muted-foreground mt-2'>이미지, 텍스트, 버튼 등 모든 내용</p>
                  </CardContent>

                  {/* Footer 영역 표시 */}
                  <CardFooter className='bg-red-50 dark:bg-red-950 border-2 border-red-300 border-dashed relative'>
                    <div className='absolute -top-6 left-0 bg-red-600 text-white px-2 py-1 rounded text-xs font-bold'>
                      CardFooter 영역
                    </div>
                    <Button variant='outline' size='sm'>액션 버튼</Button>
                    <div className='ml-auto flex space-x-2'>
                      <Button variant='ghost' size='sm'>
                        <Heart className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='sm'>
                        <Share className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              {/* CSS 클래스는 자동 적용 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>2. CSS 클래스 자동 적용 여부</h3>
                <div className='p-4 bg-amber-50 dark:bg-amber-950 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚠️ 중요: CSS 클래스는 자동으로 적용됩니다</h4>
                  <div className='space-y-3 text-sm'>
                    <div>
                      <strong className='text-green-600'>✅ 자동 적용:</strong> 각 컴포넌트의 기본 스타일은 이미 내장되어 있음
                    </div>
                    <div>
                      <strong className='text-blue-600'>🎨 커스텀:</strong> className prop으로 추가 스타일만 적용 가능
                    </div>
                    <div className='mt-4 p-3 bg-white dark:bg-gray-800 rounded border'>
                      <pre className='text-xs'>{`// 기본 사용 (스타일 자동 적용)
<Card>
  <CardHeader>
    <CardTitle>제목</CardTitle>
    <CardDescription>설명</CardDescription>
  </CardHeader>
</Card>

// 커스텀 스타일 추가
<Card className="shadow-lg">
  <CardHeader className="border-b">
    <CardTitle className="text-blue-600">파란 제목</CardTitle>
  </CardHeader>
</Card>`}</pre>
                    </div>
                  </div>
                </div>
              </div>

              {/* 각 컴포넌트의 실제 CSS 클래스 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>3. 각 컴포넌트의 실제 CSS 클래스</h3>
                <div className='grid gap-4'>

                  {/* Card 루트 */}
                  <div className='p-4 bg-blue-50 dark:bg-blue-950 rounded-lg'>
                    <h4 className='font-medium text-sm mb-2'>Card (루트 컨테이너)</h4>
                    <div className='text-xs mb-2 text-blue-700 dark:text-blue-300'>
                      👆 위 예시에서 전체 카드 영역
                    </div>
                    <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`// shadcn이 자동으로 적용하는 클래스들
bg-card text-card-foreground flex flex-col gap-6 rounded-xl border py-6 shadow-sm`}</pre>
                    <div className='grid gap-1 text-xs'>
                      <div><span className='font-mono text-blue-600'>bg-card:</span> 배경색 (라이트: white, 다크: gray-950)</div>
                      <div><span className='font-mono text-green-600'>text-card-foreground:</span> 텍스트 색상 (라이트: black, 다크: white)</div>
                      <div><span className='font-mono text-purple-600'>flex flex-col:</span> 세로 방향 Flexbox 레이아웃</div>
                      <div><span className='font-mono text-orange-600'>gap-6:</span> 자식 요소 간 24px 간격</div>
                      <div><span className='font-mono text-cyan-600'>rounded-xl:</span> 12px 둥근 모서리</div>
                      <div><span className='font-mono text-pink-600'>border:</span> 1px 실선 테두리</div>
                      <div><span className='font-mono text-red-600'>py-6:</span> 위아래 24px 패딩</div>
                      <div><span className='font-mono text-amber-600'>shadow-sm:</span> 작은 그림자 효과</div>
                    </div>
                  </div>

                  {/* CardHeader */}
                  <div className='p-4 bg-green-50 dark:bg-green-950 rounded-lg'>
                    <h4 className='font-medium text-sm mb-2'>CardHeader</h4>
                    <div className='text-xs mb-2 text-green-700 dark:text-green-300'>
                      👆 위 예시에서 파란색 테두리 영역 (제목+설명+액션)
                    </div>
                    <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`// 기본 상태
@container/card-header grid auto-rows-min grid-rows-[auto_auto] items-start gap-1.5 px-6

// CardAction이 있을 때 자동으로 추가됨
has-data-[slot=card-action]:grid-cols-[1fr_auto]

// border-b 클래스를 추가하면
[.border-b]:pb-6  // 하단에 24px 패딩 추가`}</pre>
                    <div className='grid gap-1 text-xs'>
                      <div><span className='font-mono text-blue-600'>@container/card-header:</span> Container Query 컨텍스트 생성</div>
                      <div><span className='font-mono text-green-600'>grid auto-rows-min:</span> Grid 레이아웃, 행 높이 자동 최소화</div>
                      <div><span className='font-mono text-purple-600'>grid-rows-[auto_auto]:</span> 2행 (Title, Description 각각 한 행)</div>
                      <div><span className='font-mono text-orange-600'>items-start:</span> 그리드 아이템을 시작점 정렬</div>
                      <div><span className='font-mono text-cyan-600'>gap-1.5:</span> Title과 Description 사이 6px</div>
                      <div><span className='font-mono text-pink-600'>px-6:</span> 좌우 24px 패딩 (Card와 동일)</div>
                      <div><span className='font-mono text-red-600'>has-data-[slot=card-action]:grid-cols-[1fr_auto]:</span> Action 있으면 2열 (내용 늘어남, 액션 고정)</div>
                      <div><span className='font-mono text-amber-600'>[.border-b]:pb-6:</span> border-b 클래스가 있으면 하단 패딩 24px</div>
                    </div>
                  </div>

                  <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>

                    <div className='p-4 bg-purple-50 dark:bg-purple-950 rounded-lg'>
                      <h4 className='font-medium text-sm mb-2'>CardTitle</h4>
                      <div className='text-xs mb-2 text-purple-700 dark:text-purple-300'>
                        👆 예시의 초록 영역
                      </div>
                      <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`leading-none font-semibold`}</pre>
                      <div className='grid gap-1 text-xs'>
                        <div><span className='font-mono text-blue-600'>leading-none:</span> 줄간격 1 (타이트한 줄간격)</div>
                        <div><span className='font-mono text-green-600'>font-semibold:</span> 폰트 굵기 600</div>
                      </div>
                    </div>

                    <div className='p-4 bg-orange-50 dark:bg-orange-950 rounded-lg'>
                      <h4 className='font-medium text-sm mb-2'>CardDescription</h4>
                      <div className='text-xs mb-2 text-orange-700 dark:text-orange-300'>
                        👆 예시의 노란 영역
                      </div>
                      <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`text-muted-foreground text-sm`}</pre>
                      <div className='grid gap-1 text-xs'>
                        <div><span className='font-mono text-blue-600'>text-muted-foreground:</span> 비활성 텍스트 색상 (회색 계열)</div>
                        <div><span className='font-mono text-green-600'>text-sm:</span> 폰트 크기 14px</div>
                      </div>
                    </div>

                    <div className='p-4 bg-cyan-50 dark:bg-cyan-950 rounded-lg'>
                      <h4 className='font-medium text-sm mb-2'>CardAction</h4>
                      <div className='text-xs mb-2 text-cyan-700 dark:text-cyan-300'>
                        👆 예시의 보라 영역
                      </div>
                      <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`col-start-2 row-span-2 row-start-1 self-start justify-self-end`}</pre>
                      <div className='grid gap-1 text-xs'>
                        <div><span className='font-mono text-blue-600'>col-start-2:</span> 그리드 2번째 열에 위치</div>
                        <div><span className='font-mono text-green-600'>row-span-2:</span> 2행에 걸쳐 배치</div>
                        <div><span className='font-mono text-purple-600'>row-start-1:</span> 1번째 행부터 시작</div>
                        <div><span className='font-mono text-orange-600'>self-start:</span> 세로 시작점 정렬</div>
                        <div><span className='font-mono text-cyan-600'>justify-self-end:</span> 가로 끝점 정렬</div>
                      </div>
                    </div>

                  </div>

                  {/* Content & Footer */}
                  <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                    <div className='p-4 bg-rose-50 dark:bg-rose-950 rounded-lg'>
                      <h4 className='font-medium text-sm mb-2'>CardContent</h4>
                      <div className='text-xs mb-2 text-rose-700 dark:text-rose-300'>
                        👆 예시의 주황 영역 (메인 콘텐츠)
                      </div>
                      <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`px-6`}</pre>
                      <div className='grid gap-1 text-xs'>
                        <div><span className='font-mono text-blue-600'>px-6:</span> 좌우 24px 패딩만</div>
                        <div><span className='font-mono text-green-600'>상하 패딩:</span> 없음 (Card의 gap-6으로 간격)</div>
                      </div>
                    </div>

                    <div className='p-4 bg-indigo-50 dark:bg-indigo-950 rounded-lg'>
                      <h4 className='font-medium text-sm mb-2'>CardFooter</h4>
                      <div className='text-xs mb-2 text-indigo-700 dark:text-indigo-300'>
                        👆 예시의 빨간 영역 (하단 액션)
                      </div>
                      <pre className='text-xs overflow-x-auto mb-3 bg-white dark:bg-gray-800 p-2 rounded'>{`flex items-center px-6
[.border-t]:pt-6`}</pre>
                      <div className='grid gap-1 text-xs'>
                        <div><span className='font-mono text-blue-600'>flex items-center:</span> 가로 방향 Flexbox, 세로 중앙 정렬</div>
                        <div><span className='font-mono text-green-600'>px-6:</span> 좌우 24px 패딩</div>
                        <div><span className='font-mono text-purple-600'>[.border-t]:pt-6:</span> border-t 클래스가 있으면 상단 패딩 24px</div>
                      </div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Props와 Variants */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>4. Props와 Variants</h3>
                <div className='p-4 bg-red-50 dark:bg-red-950 rounded-lg'>
                  <h4 className='font-medium text-sm mb-3'>⚠️ shadcn/ui Card는 Variants가 없습니다</h4>
                  <div className='space-y-3 text-sm'>
                    <div>
                      <strong className='text-red-600'>❌ 내장 Variants:</strong> 없음 (size, variant 등의 props 없음)
                    </div>
                    <div>
                      <strong className='text-blue-600'>✅ 사용 가능한 Props:</strong>
                      <ul className='ml-4 mt-2 space-y-1'>
                        <li>• <code className='bg-gray-200 dark:bg-gray-700 px-1 rounded'>className</code> - 커스텀 CSS 클래스</li>
                        <li>• <code className='bg-gray-200 dark:bg-gray-700 px-1 rounded'>children</code> - 자식 요소</li>
                        <li>• 기타 표준 HTML div 속성들</li>
                      </ul>
                    </div>
                    <div>
                      <strong className='text-green-600'>🎨 스타일 변형 방법:</strong> className으로만 가능
                    </div>
                  </div>
                </div>
              </div>

              {/* 실제 적용되는 CSS Values */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>5. 실제 적용되는 CSS Values</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>

                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h4 className='font-medium mb-3'>Spacing Values</h4>
                    <div className='space-y-2 text-sm font-mono'>
                      <div>gap-6: <span className='text-blue-600'>24px</span></div>
                      <div>gap-1.5: <span className='text-blue-600'>6px</span></div>
                      <div>px-6: <span className='text-blue-600'>24px</span></div>
                      <div>py-6: <span className='text-blue-600'>24px</span></div>
                      <div>pb-6: <span className='text-blue-600'>24px</span></div>
                      <div>pt-6: <span className='text-blue-600'>24px</span></div>
                    </div>
                  </div>

                  <div className='p-4 bg-muted/50 rounded-lg'>
                    <h4 className='font-medium mb-3'>Visual Values</h4>
                    <div className='space-y-2 text-sm font-mono'>
                      <div>rounded-xl: <span className='text-green-600'>12px</span></div>
                      <div>border: <span className='text-green-600'>1px solid</span></div>
                      <div>shadow-sm: <span className='text-green-600'>0 1px 2px rgba(0,0,0,0.05)</span></div>
                      <div>font-semibold: <span className='text-green-600'>600</span></div>
                      <div>text-sm: <span className='text-green-600'>14px</span></div>
                      <div>leading-none: <span className='text-green-600'>1</span></div>
                    </div>
                  </div>

                  <div className='p-4 bg-muted/50 rounded-lg md:col-span-2'>
                    <h4 className='font-medium mb-3'>CSS Variables (Design Tokens)</h4>
                    <div className='grid grid-cols-2 gap-4 text-sm font-mono'>
                      <div>
                        <div className='text-blue-600 mb-2'>Light Mode:</div>
                        <div>--card: <span className='text-gray-600'>hsl(0 0% 100%)</span></div>
                        <div>--card-foreground: <span className='text-gray-600'>hsl(222.2 84% 4.9%)</span></div>
                        <div>--muted-foreground: <span className='text-gray-600'>hsl(215.4 16.3% 46.9%)</span></div>
                        <div>--border: <span className='text-gray-600'>hsl(214.3 31.8% 91.4%)</span></div>
                      </div>
                      <div>
                        <div className='text-purple-600 mb-2'>Dark Mode:</div>
                        <div>--card: <span className='text-gray-400'>hsl(222.2 84% 4.9%)</span></div>
                        <div>--card-foreground: <span className='text-gray-400'>hsl(210 40% 98%)</span></div>
                        <div>--muted-foreground: <span className='text-gray-400'>hsl(215 20.2% 65.1%)</span></div>
                        <div>--border: <span className='text-gray-400'>hsl(217.2 32.6% 17.5%)</span></div>
                      </div>
                    </div>
                  </div>

                </div>
              </div>

            </CardContent>
          </Card>

          {/* Card 사용 예시 */}
          <Card>
            <CardHeader>
              <CardTitle>Card 사용 예시</CardTitle>
              <CardDescription>다양한 Card 구성 패턴</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>

              <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>

                {/* 기본 Card */}
                <Card>
                  <CardHeader>
                    <CardTitle>Simple Card</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm text-muted-foreground'>가장 기본적인 Card</p>
                  </CardContent>
                </Card>

                {/* 설명 포함 */}
                <Card>
                  <CardHeader>
                    <CardTitle>With Description</CardTitle>
                    <CardDescription>설명이 포함된 Card</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm'>CardDescription 추가</p>
                  </CardContent>
                </Card>

                {/* 액션 포함 */}
                <Card>
                  <CardHeader>
                    <CardTitle>With Action</CardTitle>
                    <CardDescription>우측 액션 버튼</CardDescription>
                    <CardAction>
                      <Button variant='ghost' size='sm'>
                        <MoreHorizontal className='h-4 w-4' />
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent>
                    <p className='text-sm'>우측 상단에 액션 버튼</p>
                  </CardContent>
                </Card>

              </div>

              <Separator />

              {/* 풀 구성 Card */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>완전한 구성의 Card</h3>
                <Card>
                  <CardHeader className='border-b'>
                    <CardTitle className='flex items-center gap-2'>
                      <User className='h-5 w-5' />
                      User Profile
                    </CardTitle>
                    <CardDescription>사용자 프로필 정보 관리</CardDescription>
                    <CardAction>
                      <Button variant='ghost' size='sm'>
                        <Settings className='h-4 w-4' />
                      </Button>
                    </CardAction>
                  </CardHeader>
                  <CardContent className='space-y-4'>
                    <div className='flex items-center space-x-4'>
                      <Avatar>
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className='text-sm font-medium'>John Doe</p>
                        <p className='text-xs text-muted-foreground'>john@example.com</p>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className='border-t justify-between'>
                    <Button variant='outline' size='sm'>View Profile</Button>
                    <div className='flex space-x-2'>
                      <Button variant='ghost' size='sm'>
                        <Heart className='h-4 w-4' />
                      </Button>
                      <Button variant='ghost' size='sm'>
                        <Share className='h-4 w-4' />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              </div>

              <Separator />

              {/* 커스텀 스타일 */}
              <div className='space-y-4'>
                <h3 className='text-lg font-semibold'>실제 사용 예시 (className 커스텀)</h3>
                <div className='space-y-4'>

                  {/* border-b/t 예시 */}
                  <Card>
                    <CardHeader className='border-b'>
                      <CardTitle>Header with Border</CardTitle>
                      <CardDescription>border-b 클래스 적용</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm'>CardHeader에 className="border-b" 추가</p>
                    </CardContent>
                    <CardFooter className='border-t'>
                      <p className='text-sm'>CardFooter에 className="border-t" 추가</p>
                    </CardFooter>
                  </Card>

                  {/* justify 변형 */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Footer Layout Variations</CardTitle>
                      <CardDescription>CardFooter justify 스타일 변형</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className='text-sm'>CardFooter의 다양한 레이아웃</p>
                    </CardContent>
                    <CardFooter className='justify-between'>
                      <Button variant='outline' size='sm'>Cancel</Button>
                      <Button size='sm'>Confirm</Button>
                    </CardFooter>
                  </Card>

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
              <CardDescription>Card 컴포넌트를 피그마에서 구현하기 위한 완전한 가이드</CardDescription>
            </CardHeader>
            <CardContent className='space-y-6'>

              {/* 피그마 컴포넌트 구조 */}
              <div className='p-4 bg-muted/50 rounded-lg'>
                <h4 className='font-medium mb-3'>실제 프로젝트 기반 피그마 구조</h4>
                <pre className='text-xs overflow-x-auto font-mono'>{`📁 Card (src/components/ui/card.tsx 기반)
├── 🎨 Card/Base
│   └── 기본 Card (variants 없음)
├── 🎨 Card/With-Header
│   ├── Boolean: hasDescription
│   ├── Boolean: hasAction  
│   └── Components: CardTitle, CardDescription, CardAction
├── 🎨 Card/With-Footer
│   └── Components: CardFooter
└── 🎨 Card/Complete
    └── Header + Content + Footer 조합

// 실제 사용되는 className 커스터마이징
├── CardHeader: border-b (구분선)
├── CardFooter: border-t, justify-between (레이아웃)
└── Card: 추가 shadow, padding 등`}</pre>
              </div>

              {/* Props 정보 */}
              <div className='p-4 bg-amber-50 dark:bg-amber-950 rounded-lg'>
                <h4 className='font-medium mb-3'>실제 Props (src/components/ui/card.tsx)</h4>
                <div className='space-y-2 text-sm'>
                  <div><strong>모든 컴포넌트:</strong></div>
                  <div className='ml-4'>• <code>className</code> - 추가 CSS 클래스</div>
                  <div className='ml-4'>• <code>children</code> - 자식 요소</div>
                  <div className='ml-4'>• <code>...props</code> - 표준 HTML div 속성</div>
                  <div className='mt-3'><strong>❌ 없는 Props:</strong></div>
                  <div className='ml-4'>• size variants</div>
                  <div className='ml-4'>• variant props</div>
                  <div className='ml-4'>• state props</div>
                </div>
              </div>

              {/* 개발 핸드오프 */}
              <div className='p-4 bg-blue-50 dark:bg-blue-950 rounded-lg'>
                <h4 className='font-medium mb-3'>개발 핸드오프 노트</h4>
                <div className='space-y-2 text-sm'>
                  <div>• <strong>Layout:</strong> CSS Grid (CardHeader) + Flexbox (Card 루트)</div>
                  <div>• <strong>Responsive:</strong> 패딩과 gap은 고정, 너비만 반응형</div>
                  <div>• <strong>Border:</strong> CardHeader/Footer에 border-b/t 클래스로 구분선</div>
                  <div>• <strong>Action:</strong> CardAction은 grid 2번째 열에 절대 위치</div>
                  <div>• <strong>CSS Variables:</strong> --card, --card-foreground 등 테마 대응</div>
                </div>
              </div>

            </CardContent>
          </Card>

        </div>
      </Main>
    </>
  )
}
