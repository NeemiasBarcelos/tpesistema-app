export default function Page() {
  return (
    <main className='flex min-h-screen flex-col items-center justify-center p-4 bg-gradient-to-b from-background to-muted'>
      <div className='w-full max-w-3xl mx-auto text-center space-y-8'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl'>
            Coming Soon
          </h1>
          <p className='text-xl text-muted-foreground'>
            We're working hard to bring you something amazing.
          </p>
        </div>
      </div>
    </main>
  )
}
