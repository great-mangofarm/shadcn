import { format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  selected: Date | undefined
  onSelect: (date: Date | undefined) => void
  placeholder?: string
}

export function SimpleKoreanDatePicker({
  selected,
  onSelect,
  placeholder = '날짜를 선택하세요',
}: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!selected}
          className='data-[empty=true]:text-muted-foreground w-[280px] justify-start text-left font-normal'
        >
          {selected ? (
            // 한국어 locale 없이 기본 포맷만 사용
            format(selected, 'yyyy년 MM월 dd일')
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='single'
          selected={selected}
          onSelect={onSelect}
          // locale 제거 - 기본 영어로 테스트
          disabled={(date: Date) =>
            date > new Date() || date < new Date('1900-01-01')
          }
        />
      </PopoverContent>
    </Popover>
  )
}
