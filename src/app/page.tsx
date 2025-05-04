
"use client"

import { useEffect, useState } from "react"
import { User, SendHorizonal } from "lucide-react"
import { Card, CardContent, CardFooter, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarProvider } from "@/components/ui/sidebar"
import { LoadingDots } from "@/components/loading-dots"


type Message = {
  text: string,
  userName: string,
  timeStamp: string
}

type History = Message[];

export default function ChatBot() {
  const [message, setMessage] = useState<Message | null>(null);
  const [chatHistory, setChatHistory] = useState<History>([]);
  const [chat, setChat] = useState("ChatBot Furia");
  const [botResponseIsLoading, setBotResponseIsLoading] = useState(false)
  
  const handleSend = () => {
    if (message == null || message?.text.trim() === "") return;
    console.log("Enviando mensagem:", message);
    setChatHistory((prevHistory) => [
      ...prevHistory,
      message
    ]);
    setMessage(null);
    console.log(chatHistory)
    fetchData()
  };

  const getBotResponse = async (prompt: string | null): Promise<string | null> => {
    if (prompt === null) return null;
  
    const apiUrl = chat === "ChatBot Furia"
      ? "http://localhost:8080/chat/ask"
      : "http://localhost:8080/chat/fallen";
  
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "text/plain",
        },
        body: prompt,
      });
  
      const data = await res.text();
      return data;
    } catch (e) {
      console.error("Erro:", e);
      return null;
    }
  };

  const fetchData = async () => {
    setBotResponseIsLoading(true)
    const res = await getBotResponse(message?.text ?? null);
    if (res) {
      setChatHistory((prev) => [
        ...prev,
        {
          text: res,
          userName: chat,
          timeStamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
        },
      ]);
      setBotResponseIsLoading(false)
    }
  };

  useEffect(() => { //verifica se tem algo salvo no storage do navegador na primeira vez que o código
    setChatHistory([])
    const storagedHistory = localStorage.getItem(chat)
    if(storagedHistory !== null){
      const storagedHistoryParsed = JSON.parse(storagedHistory)
      console.log(storagedHistoryParsed)
      setChatHistory(storagedHistoryParsed)
    }
  }, [chat])

  useEffect(()=>{ //atualiza o local storage
    if(chatHistory !== null){
      localStorage.setItem(chat, JSON.stringify(chatHistory));
    }
  }, [chatHistory, chat])

  return(
      <SidebarProvider className="block">
        <AppSidebar chat={chat} setChat={setChat}></AppSidebar>
        <section className="flex h-screen w-full overflow-auto bg-background">
          <div className="flex flex-col w-full h-[87%] overflow-auto p-10 gap-2">
            {chatHistory.map((message, key)=>(
              <Card key={key} className={`min-w-1/4 max-w-1/2 px-2 ` + (message.userName !== "Fã furia" ? `self-start md:ml-56` : `self-end`)}>
                <CardTitle className="flex gap-2 px-2 items-center">
                  <User className="rounded-lg"/>
                  {message.userName}
                </CardTitle>
                <CardContent className="break-words">
                  {message.text}
                </CardContent>
                <CardFooter className="text-xs text-slate-500 self-end">
                  {message.timeStamp}
                </CardFooter>
              </Card>
            ))}
            <div className={botResponseIsLoading? `self-start flex flex-row md:ml-56`: `hidden`}>
              <User className="w-8 h-8"/>
              <LoadingDots/>
            </div>
          </div>
          <div className="flex flex-row items-center w-2/3 h-16 fixed bottom-4 left-3/5 transform -translate-x-1/2">
            <Input
              className="w-full h-full pr-12"
              value={message?.text ?? ""}
              onChange={(e) => setMessage({
                text: e.target.value,
                userName: "Fã furia",
                timeStamp: new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' }),
              })}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              placeholder="Digite sua mensagem..."
            />
            <SendHorizonal
              className="absolute right-4 text-gray-500 cursor-pointer"
              onClick={handleSend}
            />
          </div>
        </section>
      </SidebarProvider>

  )
}
