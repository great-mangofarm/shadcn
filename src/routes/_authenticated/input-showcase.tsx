import { createFileRoute } from '@tanstack/react-router'
import { useState } from 'react'
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
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Switch } from '@/components/ui/switch'
import { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator } from '@/components/ui/input-otp'
import { PasswordInput } from '@/components/password-input'
import { DatePicker } from '@/components/date-picker'
import { Button } from '@/components/ui/button'
import { Mail, Phone, AlertCircle, CheckCircle2 } from 'lucide-react'
import { IconEye, IconEyeOff } from '@tabler/icons-react'

export const Route = createFileRoute('/_authenticated/input-showcase')({
  component: InputShowcase,
})

function InputShowcase() {
  const [textValue, setTextValue] = useState('')
  const [emailValue, setEmailValue] = useState('')
  const [phoneValue, setPhoneValue] = useState('')
  const [passwordValue, setPasswordValue] = useState('')
  const [textareaValue, setTextareaValue] = useState('')
  const [selectValue, setSelectValue] = useState('')
  const [checkboxValue, setCheckboxValue] = useState(false)
  const [radioValue, setRadioValue] = useState('')
  const [switchValue, setSwitchValue] = useState(false)
  const [otpValue, setOtpValue] = useState('')
  const [dateValue, setDateValue] = useState<Date | undefined>()

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
            <h1 className='text-3xl font-bold tracking-tight'>Input Showcase</h1>
            <p className='text-muted-foreground mt-2'>
              All input components and variants used in this project
            </p>
          </div>

          {/* Text Inputs */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Text Inputs
                <Badge variant='secondary'>5 types</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-8'>
              {/* Basic Input */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>input</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<Input />'}</code>
                </div>
                
                <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                  <h4 className='font-medium text-sm'>CSS Classes Applied:</h4>
                  <div className='grid gap-1 text-xs font-mono'>
                    <div><span className='text-blue-600'>Size:</span> h-9 w-full min-w-0 (height: 36px, full width)</div>
                    <div><span className='text-green-600'>Layout:</span> flex rounded-md border bg-transparent</div>
                    <div><span className='text-purple-600'>Spacing:</span> px-3 py-1 (padding: 12px horizontal, 4px vertical)</div>
                    <div><span className='text-orange-600'>Typography:</span> text-base md:text-sm (16px mobile, 14px desktop)</div>
                    <div><span className='text-cyan-600'>Border:</span> border-input shadow-xs</div>
                    <div><span className='text-pink-600'>Placeholder:</span> placeholder:text-muted-foreground</div>
                    <div><span className='text-red-600'>Focus:</span> focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]</div>
                    <div><span className='text-amber-600'>Error:</span> aria-invalid:border-destructive aria-invalid:ring-destructive/20</div>
                    <div><span className='text-gray-600'>Disabled:</span> disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none</div>
                    <div><span className='text-indigo-600'>ReadOnly:</span> No readOnly: pseudo-class in shadcn (HTML attribute only)</div>
                  </div>
                </div>

                <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                  <h4 className='font-medium text-sm'>Typography & Structure:</h4>
                  <div className='grid gap-1 text-xs font-mono'>
                    <div><span className='text-blue-600'>Label:</span> text-sm leading-none font-medium (14px, medium weight)</div>
                    <div><span className='text-green-600'>Placeholder:</span> placeholder:text-muted-foreground (muted gray color)</div>
                    <div><span className='text-purple-600'>Input Value:</span> text-base md:text-sm (same as input typography)</div>
                    <div><span className='text-orange-600'>Helper Text:</span> text-xs text-muted-foreground (12px muted gray)</div>
                    <div><span className='text-red-600'>Error Message:</span> text-sm text-destructive (14px red text)</div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                  
                  {/* Default State */}
                  <div className='space-y-2'>
                    <Label htmlFor='default-input' className='text-sm leading-none font-medium'>
                      Default State
                    </Label>
                    <Input 
                      id='default-input'
                      placeholder='Enter text here...'
                      readOnly
                    />
                    <p className='text-xs text-muted-foreground'>
                      Helper text appears below input
                    </p>
                  </div>

                  {/* Focused State */}
                  <div className='space-y-2'>
                    <Label htmlFor='focused-input' className='text-sm leading-none font-medium'>
                      Focused State
                    </Label>
                    <Input 
                      id='focused-input'
                      placeholder='Focused input'
                      className='border-ring ring-ring/50 ring-[3px]'
                      readOnly
                    />
                    <p className='text-xs text-muted-foreground'>
                      Focus ring: border-ring + ring-ring/50 + ring-[3px]
                    </p>
                  </div>

                  {/* With Value */}
                  <div className='space-y-2'>
                    <Label htmlFor='value-input' className='text-sm leading-none font-medium'>
                      With Value
                    </Label>
                    <Input 
                      id='value-input'
                      value='Some typed content'
                      readOnly
                    />
                    <p className='text-xs text-muted-foreground'>
                      Value present, placeholder hidden
                    </p>
                  </div>

                  {/* Error State */}
                  <div className='space-y-2'>
                    <Label htmlFor='error-input' className='text-sm leading-none font-medium'>
                      Error State
                    </Label>
                    <Input 
                      id='error-input'
                      value='invalid input'
                      className='border-destructive ring-destructive/20 ring-[3px]'
                      readOnly
                    />
                    <p className='text-sm text-destructive'>
                      This field contains an error
                    </p>
                  </div>

                  {/* Disabled State */}
                  <div className='space-y-2'>
                    <Label htmlFor='disabled-input' className='text-sm leading-none font-medium'>
                      Disabled State
                    </Label>
                    <Input 
                      id='disabled-input'
                      placeholder='Cannot interact'
                      disabled
                      className='disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none'
                    />
                    <p className='text-xs text-muted-foreground'>
                      disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none
                    </p>
                  </div>

                  {/* ReadOnly State */}
                  <div className='space-y-2'>
                    <Label htmlFor='readonly-input' className='text-sm leading-none font-medium'>
                      ReadOnly State
                    </Label>
                    <Input 
                      id='readonly-input'
                      value='Read only content'
                      readOnly
                      className='bg-muted/50 cursor-default'
                    />
                    <p className='text-xs text-muted-foreground'>
                      Custom: bg-muted/50 + cursor-default
                    </p>
                  </div>

                </div>

                <div className='p-4 bg-blue-50 rounded-lg'>
                  <h4 className='font-medium text-sm mb-2'>Complete HTML Structure Example:</h4>
                  <pre className='text-xs overflow-x-auto'>
{`<div className="space-y-2">
  <Label htmlFor="example" className="text-sm leading-none font-medium">
    Field Label
  </Label>
  <Input 
    id="example"
    placeholder="Placeholder text"
    className="flex h-9 w-full min-w-0 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:border-destructive aria-invalid:ring-destructive/20 disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none md:text-sm"
  />
  <p className="text-xs text-muted-foreground">
    Helper text (optional)
  </p>
  <p className="text-sm text-destructive">
    Error message (when error exists)
  </p>
</div>

{/* ReadOnly with custom styling */}
<Input 
  readOnly
  className="flex h-9 w-full min-w-0 rounded-md border border-input bg-muted/50 px-3 py-1 text-base shadow-xs placeholder:text-muted-foreground cursor-default md:text-sm"
/>`}
                  </pre>
                </div>

                <p className='text-sm text-muted-foreground'>
                  Standard Input: Height 36px (h-9), Border radius 6px (rounded-md), Padding 12px horizontal / 4px vertical
                </p>
              </div>

              <Separator />

              {/* Email Input */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>email</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>type="email"</code>
                </div>

                {/* CSS Classes Details */}
                <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                  <h4 className='font-medium text-sm'>Icon Integration:</h4>
                  <div className='grid gap-2 text-xs font-mono'>
                    <div><span className='text-blue-600'>Container:</span> relative (for absolute positioning)</div>
                    <div><span className='text-green-600'>Icon:</span> absolute left-3 top-1/2 transform -translate-y-1/2</div>
                    <div><span className='text-purple-600'>Input:</span> pl-10 (left padding for icon space)</div>
                    <div><span className='text-orange-600'>Colors:</span> text-muted-foreground (icons), text-destructive (error)</div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='email-input'>With Left Icon</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                      <Input 
                        id='email-input'
                        type='email'
                        placeholder='Enter your email'
                        className='pl-10'
                        value={emailValue}
                        onChange={(e) => setEmailValue(e.target.value)}
                      />
                    </div>
                    <code className='text-xs text-muted-foreground block'>className="pl-10"</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='invalid-email'>Error + Right Icon</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                      <Input 
                        id='invalid-email'
                        type='email'
                        placeholder='invalid@'
                        className='pl-10 pr-10'
                        aria-invalid='true'
                      />
                      <AlertCircle className='absolute right-3 top-1/2 transform -translate-y-1/2 text-destructive h-4 w-4' />
                    </div>
                    <code className='text-xs text-muted-foreground block'>className="pl-10 pr-10"</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='focused-email'>Focus State</Label>
                    <div className='relative'>
                      <Mail className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                      <Input 
                        id='focused-email'
                        type='email'
                        placeholder='Focus to see ring'
                        className='pl-10'
                      />
                    </div>
                    <code className='text-xs text-muted-foreground block'>Focus ring with icon</code>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Email input with HTML5 validation + icon positioning using absolute/relative
                </p>
              </div>

              <Separator />

              {/* Phone Input */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>phone</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>type="tel"</code>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='phone-input'>Default</Label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                      <Input 
                        id='phone-input'
                        type='tel'
                        placeholder='+1 (555) 123-4567'
                        className='pl-10'
                        value={phoneValue}
                        onChange={(e) => setPhoneValue(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='valid-phone'>Success State</Label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                      <Input 
                        id='valid-phone'
                        type='tel'
                        value='+1 (555) 123-4567'
                        className='pl-10 pr-10 border-green-500 focus-visible:ring-green-500/20'
                        readOnly
                      />
                      <CheckCircle2 className='absolute right-3 top-1/2 transform -translate-y-1/2 text-green-500 h-4 w-4' />
                    </div>
                    <code className='text-xs text-muted-foreground block'>Custom success styling</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='focused-phone'>Focus + Icon</Label>
                    <div className='relative'>
                      <Phone className='absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4' />
                      <Input 
                        id='focused-phone'
                        type='tel'
                        placeholder='Click me'
                        className='pl-10'
                      />
                    </div>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Telephone input with custom validation styling overrides
                </p>
              </div>

              <Separator />

              {/* Password Input */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>password</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<PasswordInput />'}</code>
                  <Badge variant='secondary' className='text-xs'>Custom Component</Badge>
                </div>

                {/* CSS Classes Details */}
                <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                  <h4 className='font-medium text-sm'>PasswordInput Structure:</h4>
                  <div className='grid gap-2 text-xs font-mono'>
                    <div><span className='text-blue-600'>Wrapper:</span> relative rounded-md</div>
                    <div><span className='text-green-600'>Input:</span> Same as base Input + type="password"</div>
                    <div><span className='text-purple-600'>Toggle:</span> Button absolute top-1/2 right-1 h-6 w-6</div>
                    <div><span className='text-orange-600'>Icon:</span> IconEye / IconEyeOff size={18}</div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='password-input'>Hidden Password</Label>
                    <PasswordInput 
                      id='password-input'
                      placeholder='Enter your password'
                      value={passwordValue}
                      onChange={(e) => setPasswordValue(e.target.value)}
                    />
                    <code className='text-xs text-muted-foreground block'>type="password" by default</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='disabled-password'>Disabled State</Label>
                    <PasswordInput 
                      id='disabled-password'
                      placeholder='Cannot type here'
                      disabled
                    />
                    <code className='text-xs text-muted-foreground block'>Input & Button both disabled</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='password-error'>Error State</Label>
                    <PasswordInput 
                      id='password-error'
                      placeholder='Password required'
                      aria-invalid='true'
                      className='aria-invalid:ring-destructive/20 aria-invalid:border-destructive'
                    />
                    <code className='text-xs text-muted-foreground block'>Same error styling as Input</code>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Custom component: Input wrapper + useState toggle + absolute positioned Button + Tabler icons
                </p>
              </div>

              <Separator />

              {/* Textarea */}
              <div className='space-y-4'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>textarea</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<Textarea />'}</code>
                  <Badge variant='secondary' className='text-xs'>shadcn/ui Component</Badge>
                </div>

                {/* Structure Details */}
                <div className='p-4 bg-muted/50 rounded-lg space-y-3'>
                  <h4 className='font-medium text-sm'>Textarea CSS Differences from Input:</h4>
                  <div className='grid gap-1 text-xs font-mono'>
                    <div><span className='text-blue-600'>Element:</span> {'<textarea>'} instead of {'<input>'}</div>
                    <div><span className='text-green-600'>Height:</span> min-h-16 (64px minimum) vs h-9 (36px fixed)</div>
                    <div><span className='text-purple-600'>Padding:</span> px-3 py-2 (8px vertical) vs px-3 py-1 (4px vertical)</div>
                    <div><span className='text-orange-600'>Resize:</span> field-sizing-content (auto height adjustment)</div>
                    <div><span className='text-cyan-600'>Typography:</span> Same text-base md:text-sm</div>
                    <div><span className='text-pink-600'>States:</span> Same focus, error, disabled, placeholder styles</div>
                    <div><span className='text-indigo-600'>Border:</span> Same border-input rounded-md shadow-xs</div>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='textarea-input'>Multi-line Text</Label>
                    <Textarea 
                      id='textarea-input'
                      placeholder='Type your message here...'
                      value={textareaValue}
                      onChange={(e) => setTextareaValue(e.target.value)}
                      rows={4}
                    />
                    <code className='text-xs text-muted-foreground block'>rows={`{4}`} sets initial height</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='disabled-textarea'>Disabled State</Label>
                    <Textarea 
                      id='disabled-textarea'
                      placeholder='Cannot type here'
                      disabled
                      rows={4}
                    />
                    <code className='text-xs text-muted-foreground block'>Same disabled styling as Input</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='error-textarea'>Error State</Label>
                    <Textarea 
                      id='error-textarea'
                      placeholder='This field is required'
                      aria-invalid='true'
                      rows={4}
                      defaultValue='Too short'
                    />
                    <code className='text-xs text-muted-foreground block'>aria-invalid triggers error styling</code>
                  </div>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='readonly-textarea'>Read Only Textarea</Label>
                    <Textarea 
                      id='readonly-textarea'
                      value='This content cannot be edited.&#10;Multi-line read-only text.&#10;Perfect for displaying information.'
                      readOnly
                      className='bg-muted/50 cursor-default'
                      rows={3}
                    />
                    <code className='text-xs text-muted-foreground block'>readOnly + custom background</code>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='auto-resize-textarea'>Auto-resize Example</Label>
                    <Textarea 
                      id='auto-resize-textarea'
                      placeholder='Start typing and watch me grow...'
                      className='min-h-[40px] max-h-[200px] resize-none'
                    />
                    <code className='text-xs text-muted-foreground block'>field-sizing-content enables auto-resize</code>
                  </div>
                </div>

                <p className='text-sm text-muted-foreground'>
                  Multi-line input - min-height: 64px (min-h-16), auto-grows with content via field-sizing-content
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Selection Inputs */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Selection Inputs
                <Badge variant='secondary'>4 types</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* Select */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>select</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<Select />'}</code>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='select-default'>Default Select</Label>
                    <Select value={selectValue} onValueChange={setSelectValue}>
                      <SelectTrigger>
                        <SelectValue placeholder='Select an option' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='option1'>Option 1</SelectItem>
                        <SelectItem value='option2'>Option 2</SelectItem>
                        <SelectItem value='option3'>Option 3</SelectItem>
                        <SelectItem value='option4' disabled>Disabled Option</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='select-sm'>Small Select</Label>
                    <Select>
                      <SelectTrigger size='sm'>
                        <SelectValue placeholder='Small select' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='sm1'>Small 1</SelectItem>
                        <SelectItem value='sm2'>Small 2</SelectItem>
                        <SelectItem value='sm3'>Small 3</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label htmlFor='select-disabled'>Disabled Select</Label>
                    <Select disabled>
                      <SelectTrigger>
                        <SelectValue placeholder='Disabled' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='disabled'>Won't show</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Dropdown selection with multiple options and sizes
                </p>
              </div>

              <Separator />

              {/* Checkbox */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>checkbox</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<Checkbox />'}</code>
                </div>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-2'>
                    <Checkbox 
                      id='checkbox1'
                      checked={checkboxValue}
                      onCheckedChange={setCheckboxValue}
                    />
                    <Label htmlFor='checkbox1'>Default checkbox</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='checkbox2' defaultChecked />
                    <Label htmlFor='checkbox2'>Checked by default</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='checkbox3' disabled />
                    <Label htmlFor='checkbox3' className='text-muted-foreground'>Disabled checkbox</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Checkbox id='checkbox4' disabled checked />
                    <Label htmlFor='checkbox4' className='text-muted-foreground'>Disabled & checked</Label>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Binary selection control for multiple choices
                </p>
              </div>

              <Separator />

              {/* Radio Group */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>radio</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<RadioGroup />'}</code>
                </div>
                <div className='space-y-4'>
                  <RadioGroup value={radioValue} onValueChange={setRadioValue}>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='option1' id='radio1' />
                      <Label htmlFor='radio1'>Option 1</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='option2' id='radio2' />
                      <Label htmlFor='radio2'>Option 2</Label>
                    </div>
                    <div className='flex items-center space-x-2'>
                      <RadioGroupItem value='option3' id='radio3' />
                      <Label htmlFor='radio3'>Option 3</Label>
                    </div>
                  </RadioGroup>
                  <div className='pt-2 border-t'>
                    <p className='text-sm text-muted-foreground'>Disabled radio group:</p>
                    <RadioGroup disabled className='mt-2'>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='disabled1' id='radio-disabled1' />
                        <Label htmlFor='radio-disabled1'>Disabled option 1</Label>
                      </div>
                      <div className='flex items-center space-x-2'>
                        <RadioGroupItem value='disabled2' id='radio-disabled2' />
                        <Label htmlFor='radio-disabled2'>Disabled option 2</Label>
                      </div>
                    </RadioGroup>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Single selection from multiple options
                </p>
              </div>

              <Separator />

              {/* Switch */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>switch</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<Switch />'}</code>
                </div>
                <div className='space-y-4'>
                  <div className='flex items-center space-x-2'>
                    <Switch 
                      id='switch1'
                      checked={switchValue}
                      onCheckedChange={setSwitchValue}
                    />
                    <Label htmlFor='switch1'>Enable notifications</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Switch id='switch2' defaultChecked />
                    <Label htmlFor='switch2'>Auto-save enabled</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Switch id='switch3' disabled />
                    <Label htmlFor='switch3' className='text-muted-foreground'>Disabled switch</Label>
                  </div>
                  <div className='flex items-center space-x-2'>
                    <Switch id='switch4' disabled checked />
                    <Label htmlFor='switch4' className='text-muted-foreground'>Disabled & checked</Label>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Toggle between two states (on/off)
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Specialized Inputs */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Specialized Inputs
                <Badge variant='secondary'>2 types</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              {/* OTP Input */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>otp</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<InputOTP />'}</code>
                </div>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label htmlFor='otp-input'>Verification Code</Label>
                    <InputOTP maxLength={6} value={otpValue} onChange={setOtpValue}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  <div className='space-y-2'>
                    <Label>Credit Card Number</Label>
                    <InputOTP maxLength={16}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                        <InputOTPSlot index={6} />
                        <InputOTPSlot index={7} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={8} />
                        <InputOTPSlot index={9} />
                        <InputOTPSlot index={10} />
                        <InputOTPSlot index={11} />
                      </InputOTPGroup>
                      <InputOTPSeparator />
                      <InputOTPGroup>
                        <InputOTPSlot index={12} />
                        <InputOTPSlot index={13} />
                        <InputOTPSlot index={14} />
                        <InputOTPSlot index={15} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  One-time password or secure code input with individual character slots
                </p>
              </div>

              <Separator />

              {/* Date Picker */}
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>date</Badge>
                  <code className='text-sm bg-muted px-2 py-1 rounded'>{'<DatePicker />'}</code>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Select Date</Label>
                    <DatePicker
                      selected={dateValue}
                      onSelect={setDateValue}
                      placeholder='Pick a date'
                    />
                  </div>
                  <div className='space-y-2'>
                    <Label>Birth Date</Label>
                    <DatePicker
                      selected={undefined}
                      onSelect={() => {}}
                      placeholder='Select your birth date'
                    />
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Calendar-based date selection with dropdown interface
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Input Sizes */}
          <Card>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                Input Sizes & States
                <Badge variant='secondary'>variations</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-6'>
              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>sizes</Badge>
                  <span className='text-sm text-muted-foreground'>Different input heights</span>
                </div>
                <div className='space-y-4'>
                  <div className='space-y-2'>
                    <Label>Small Select (h-8)</Label>
                    <Select>
                      <SelectTrigger size='sm' className='w-[200px]'>
                        <SelectValue placeholder='Small select' />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value='sm'>Small option</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className='space-y-2'>
                    <Label>Default Input (h-9)</Label>
                    <Input placeholder='Default height input' className='w-[200px]' />
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Consistent sizing across all input components
                </p>
              </div>

              <Separator />

              <div className='space-y-3'>
                <div className='flex items-center gap-3'>
                  <Badge variant='outline'>states</Badge>
                  <span className='text-sm text-muted-foreground'>Focus, error, and disabled states</span>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div className='space-y-2'>
                    <Label>Focus State</Label>
                    <Input placeholder='Click to see focus ring' />
                  </div>
                  <div className='space-y-2'>
                    <Label>Error State</Label>
                    <Input placeholder='Error state' aria-invalid='true' />
                  </div>
                </div>
                <p className='text-sm text-muted-foreground'>
                  Visual feedback for different interaction states
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
