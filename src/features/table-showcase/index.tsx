import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

export default function TableShowcase() {
  return (
    <>
      <Header fixed>
        <Search />
        <div className='ml-auto flex items-center space-x-4'>
          <ThemeSwitch />
          <ProfileDropdown />
        </div>
      </Header>

      <Main>
        <div className='mb-8'>
          <h1 className='text-3xl font-bold tracking-tight'>Table Design System</h1>
          <p className='text-muted-foreground text-lg mt-2'>
            Complete guide for implementing table components in Figma design system
          </p>
        </div>

        {/* 1단계: 기본 구조 분석 */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6'>1. Basic Table Components Structure</h2>
          
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl font-medium mb-4'>Base Table Component Anatomy</h3>
              <p className='text-muted-foreground mb-4'>
                Our table system is built on shadcn/ui components with data-slot architecture for semantic structure.
              </p>
              
              <div className='bg-muted/30 p-6 rounded-lg mb-4'>
                <h4 className='font-medium mb-3'>Table Wrapper Structure:</h4>
                <code className='text-sm'>
                  {`<div data-slot="table-container" className="relative w-full overflow-x-auto">
  <table data-slot="table" className="w-full caption-bottom text-sm">
    <thead data-slot="table-header" className="[&_tr]:border-b">
      <tr data-slot="table-row">
        <th data-slot="table-head" className="h-10 px-2 text-left align-middle font-medium">
    <tbody data-slot="table-body" className="[&_tr:last-child]:border-0">
      <tr data-slot="table-row" className="hover:bg-muted/50 data-[state=selected]:bg-muted border-b">
        <td data-slot="table-cell" className="p-2 align-middle">`}
                </code>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-medium mb-4'>Component Styling Analysis</h3>
              
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Table Container</h4>
                  <ul className='text-sm text-muted-foreground space-y-1'>
                    <li>• <code>relative w-full overflow-x-auto</code></li>
                    <li>• Provides horizontal scroll for responsive design</li>
                    <li>• Contains the entire table structure</li>
                  </ul>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Table Base</h4>
                  <ul className='text-sm text-muted-foreground space-y-1'>
                    <li>• <code>w-full caption-bottom text-sm</code></li>
                    <li>• Full width with small text sizing</li>
                    <li>• Caption positioned at bottom if used</li>
                  </ul>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Table Header</h4>
                  <ul className='text-sm text-muted-foreground space-y-1'>
                    <li>• <code>[&_tr]:border-b</code></li>
                    <li>• Bottom border on all header rows</li>
                    <li>• Semantic thead element</li>
                  </ul>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Table Body</h4>
                  <ul className='text-sm text-muted-foreground space-y-1'>
                    <li>• <code>[&_tr:last-child]:border-0</code></li>
                    <li>• Removes border from last row</li>
                    <li>• Contains all data rows</li>
                  </ul>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Table Row</h4>
                  <ul className='text-sm text-muted-foreground space-y-1'>
                    <li>• <code>hover:bg-muted/50</code> - Hover effect</li>
                    <li>• <code>data-[state=selected]:bg-muted</code> - Selected state</li>
                    <li>• <code>border-b transition-colors</code> - Border and transitions</li>
                  </ul>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Table Cells</h4>
                  <ul className='text-sm text-muted-foreground space-y-1'>
                    <li>• <code>h-10 px-2</code> (header) / <code>p-2</code> (cell)</li>
                    <li>• <code>align-middle whitespace-nowrap</code></li>
                    <li>• <code>[&:has([role=checkbox])]:pr-0</code> - Checkbox handling</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 2단계: DataTable 메인 컴포넌트 분석 */}
        <section className='mb-12'>
          <h2 className='text-2xl font-semibold mb-6'>2. DataTable Main Component Analysis</h2>
          
          <div className='space-y-8'>
            <div>
              <h3 className='text-xl font-medium mb-4'>Component Architecture</h3>
              <p className='text-muted-foreground mb-4'>
                DataTable is built on @tanstack/react-table with integrated state management for sorting, filtering, pagination, and row selection.
              </p>
              
              <div className='bg-muted/30 p-6 rounded-lg mb-4'>
                <h4 className='font-medium mb-3'>Core Props Interface:</h4>
                <code className='text-sm block whitespace-pre'>
{`interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]  // Column definitions
  data: TData[]                        // Table data
}`}
                </code>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-medium mb-4'>State Management Features</h3>
              
              <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Row Selection</h4>
                  <p className='text-sm text-muted-foreground'>
                    Multi-select with checkboxes, tracked via <code>rowSelection</code> state
                  </p>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Column Visibility</h4>
                  <p className='text-sm text-muted-foreground'>
                    Show/hide columns dynamically via <code>columnVisibility</code> state
                  </p>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Column Filters</h4>
                  <p className='text-sm text-muted-foreground'>
                    Text and faceted filtering via <code>columnFilters</code> state
                  </p>
                </div>
                
                <div className='bg-card border rounded-lg p-4'>
                  <h4 className='font-medium mb-2'>Sorting</h4>
                  <p className='text-sm text-muted-foreground'>
                    Multi-column sorting via <code>sorting</code> state
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-medium mb-4'>Layout Structure</h3>
              <p className='text-muted-foreground mb-4'>
                DataTable follows a consistent layout pattern with toolbar, table, and pagination sections.
              </p>
              
              <div className='bg-muted/30 p-6 rounded-lg'>
                <h4 className='font-medium mb-3'>Component Layout:</h4>
                <code className='text-sm block whitespace-pre'>
{`<div className="space-y-4">
  <DataTableToolbar table={table} />           // Search, filters, actions
  <div className="overflow-hidden rounded-md border">
    <Table>                                     // Core table wrapper
      <TableHeader>                             // Column headers
      <TableBody>                               // Data rows
    </Table>
  </div>
  <DataTablePagination table={table} />        // Page controls
</div>`}
                </code>
              </div>
            </div>

            <div>
              <h3 className='text-xl font-medium mb-4'>Basic Usage Example</h3>
              <p className='text-muted-foreground mb-4'>
                Minimal DataTable implementation with essential features.
              </p>
              
              <div className='bg-muted/30 p-6 rounded-lg mb-6'>
                <h4 className='font-medium mb-3'>Implementation:</h4>
                <code className='text-sm block whitespace-pre'>
{`// Basic column definition
const columns = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status", 
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email", 
  }
]

// Basic data
const data = [
  { name: "John Doe", status: "Active", email: "john@example.com" },
  { name: "Jane Smith", status: "Inactive", email: "jane@example.com" }
]

// Component usage
<DataTable columns={columns} data={data} />`}
                </code>
              </div>

              {/* 실제 예시를 위한 기본 테이블 */}
              <div className='border rounded-lg overflow-hidden'>
                <div className='p-4 border-b bg-muted/20'>
                  <h4 className='font-medium'>Result Preview:</h4>
                  <p className='text-sm text-muted-foreground'>Basic DataTable with minimal configuration</p>
                </div>
                
                <div className='p-4'>
                  {/* 간단한 테이블 예시 */}
                  <div className='space-y-4'>
                    {/* Toolbar placeholder */}
                    <div className='flex items-center justify-between'>
                      <div className='flex items-center space-x-2'>
                        <div className='h-8 w-[250px] bg-muted rounded border'></div>
                        <div className='h-8 w-[100px] bg-muted rounded border'></div>
                      </div>
                      <div className='h-8 w-[120px] bg-muted rounded border'></div>
                    </div>
                    
                    {/* Table placeholder */}
                    <div className='border rounded-md'>
                      <div className='border-b'>
                        <div className='flex h-10 items-center px-2 font-medium text-sm bg-muted/20'>
                          <div className='w-8'></div>
                          <div className='flex-1 px-2'>Name</div>
                          <div className='w-24 px-2'>Status</div>
                          <div className='flex-1 px-2'>Email</div>
                          <div className='w-12'></div>
                        </div>
                      </div>
                      <div className='divide-y'>
                        <div className='flex h-12 items-center px-2 hover:bg-muted/50 text-sm'>
                          <div className='w-8 flex justify-center'>
                            <div className='w-4 h-4 border rounded'></div>
                          </div>
                          <div className='flex-1 px-2'>John Doe</div>
                          <div className='w-24 px-2'>
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800'>Active</span>
                          </div>
                          <div className='flex-1 px-2'>john@example.com</div>
                          <div className='w-12 flex justify-center'>
                            <div className='w-6 h-6 border rounded'></div>
                          </div>
                        </div>
                        <div className='flex h-12 items-center px-2 hover:bg-muted/50 text-sm'>
                          <div className='w-8 flex justify-center'>
                            <div className='w-4 h-4 border rounded'></div>
                          </div>
                          <div className='flex-1 px-2'>Jane Smith</div>
                          <div className='w-24 px-2'>
                            <span className='inline-flex items-center px-2 py-1 rounded-full text-xs bg-gray-100 text-gray-800'>Inactive</span>
                          </div>
                          <div className='flex-1 px-2'>jane@example.com</div>
                          <div className='w-12 flex justify-center'>
                            <div className='w-6 h-6 border rounded'></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    {/* Pagination placeholder */}
                    <div className='flex items-center justify-between'>
                      <div className='text-sm text-muted-foreground'>
                        0 of 2 row(s) selected.
                      </div>
                      <div className='flex items-center space-x-6'>
                        <div className='flex items-center space-x-2'>
                          <span className='text-sm'>Rows per page</span>
                          <div className='h-8 w-16 border rounded'></div>
                        </div>
                        <div className='text-sm'>Page 1 of 1</div>
                        <div className='flex items-center space-x-2'>
                          <div className='h-8 w-8 border rounded'></div>
                          <div className='h-8 w-8 border rounded'></div>
                          <div className='h-8 w-8 border rounded'></div>
                          <div className='h-8 w-8 border rounded'></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Main>
    </>
  )
}
