import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import { MessageCircleWarning, Send, SendHorizonal } from 'lucide-react'
import React from 'react'

const Discussion = () => {

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  )

  const messages = [{
    message: "Hello", user: "Chirag", role: "Instructor"
  }, {
    message: "Hi", user: "Ashpreet", role: "Student"
  }]

  const isTyping = true;
  return (
    <div className='pt-20 flex justify-center'>
      <Card className="w-[550px] h-[550px] flex flex-col">
        <CardHeader>
          <CardTitle>Discussion Forum</CardTitle>
          <CardDescription className="text-red-700">
            <div className='flex items-center'>
              <MessageCircleWarning></MessageCircleWarning>
              <span>Respect other participants and dont use and support vulagarity</span>
            </div>
          </CardDescription>
        </CardHeader>
        <CardContent className="flex-1 flex-col overflow-hidden">
          <ScrollArea className="h-full w-full">
            <div>
              {messages.map((message) => (
                message.user === "Chirag" ?
                  <>
                    <div key={message} className="inline-block text-sm bg-gray-200 rounded-md p-2 pl-3">
                      <div className='flex flex-col gap-2'>
                        <div className='flex gap-2 justify-center'>
                          <Avatar className="h-6 w-6 md:h-6 md:w-6">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                          </Avatar>
                          <span className='font-semibold text-base'>{message.user}</span>
                          <Badge className="bg">{message.role}</Badge>
                        </div>
                        <div className='text-semibold'>
                          {message.message}
                        </div>
                      </div>
                    </div>
                    <div className='mt-2'></div>
                  </> :
                  <>
                    <div key={message} className="flex justify-end">
                      <div key={message} className="inline-block text-sm bg-gray-200 rounded-md p-2 pl-3">
                        <div className='flex flex-col gap-2'>
                          <div className='flex gap-2 justify-center'>
                            <Avatar className="h-6 w-6 md:h-6 md:w-6">
                              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                              <AvatarFallback>CN</AvatarFallback>
                            </Avatar>
                            <span className='font-semibold text-base'>{message.user}</span>
                            <Badge className="bg">{message.role}</Badge>
                          </div>
                          <div className='text-base'>
                            {message.message}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2"></div>
                  </>
              ))}
            </div>
          </ScrollArea>
          {
            isTyping ? (<div className='pl-1'>Chirag is Typing...</div>) : (<div></div>)
          }
        </CardContent>
        <CardFooter className="flex pt-2 ">
          <Input placeholder="Type your message here" className="rounded-r-none focus:outline-none"></Input>
          <Button className="rounded-l-none"><Send /></Button>
        </CardFooter>
      </Card>
    </div>

  )
}

export default Discussion