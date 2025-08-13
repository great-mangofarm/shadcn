import { format } from 'date-fns'
import { ko } from 'date-fns/locale'
import { Calendar as CalendarIcon } from 'lucide-react'
import { DateRange } from 'react-day-picker'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'

interface Props {
  selected: DateRange | undefined
  onSelect: (range: DateRange | undefined) => void
  placeholder?: string
}

export function KoreanDateRangePicker({
                                        selected,
                                        onSelect,
                                        placeholder = '기간을 선택하세요',
                                      }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          data-empty={!selected?.from}
          className='data-[empty=true]:text-muted-foreground w-[320px] justify-start text-left font-normal'
        >
          {selected?.from ? (
            selected.to ? (
              <>
                {format(selected.from, 'yyyy년 MM월 dd일', { locale: ko })} -{' '}
                {format(selected.to, 'yyyy년 MM월 dd일', { locale: ko })}
              </>
            ) : (
              format(selected.from, 'yyyy년 MM월 dd일', { locale: ko })
            )
          ) : (
            <span>{placeholder}</span>
          )}
          <CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-auto p-0' align='start'>
        <Calendar
          mode='range'
          captionLayout='dropdown'
          selected={selected}
          onSelect={onSelect}
          locale={ko}
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
      </PopoverContent>
    </Popover>
  )
}