"use client"

import {
  MessageSquare,
  ImageIcon,
  Sparkles,
  TrendingUp,
  Bot,
  Globe,
  ArrowLeft,
  Send,
  MoreVertical,
  Wand2,
  Settings,
  PenTool,
  Lightbulb,
  Megaphone,
  Newspaper,
  Film,
  Search,
  FileText,
  Brain,
  BookOpen,
  BarChart3,
  Zap,
} from "lucide-react"
import { useState, useEffect } from "react"
import Image from "next/image"

type Screen =
  | "home"
  | "chat-tools"
  | "llama-chat"
  | "chat-interface"
  | "image-tools"
  | "text-to-image"
  | "stable-diffusion"
  | "content-tools"
  | "coming-soon"
  | "advanced-text-tools"
  | "text-summary"
  | "sentiment-analysis"
  | "contextual-qa"
  | "creative-writing"
  | "blog-ideas"
  | "social-media"
  | "headlines"
  | "movie-suggestions"
  | "ai-trading"
  | "trading-analyzer"
  | "explosive-coins"

type BotType = "llama-b8" | "llama-b70" | "giminai-flash"

type Language = "ar" | "en" | "de" | "ch" | "fr" | "ru"

const translations = {
  ar: {
    chatTools: "أدوات المحادثة",
    imageTools: "أدوات الصور",
    aiContentCreation: "أدوات صناعة المحتوى بالذكاء الاصطناعي",
    aiTrading: "التداول بالذكاء الاصطناعي",
    interactiveChat: "الدردشة التفاعلية",
    advancedTextTools: "أدوات النصوص المتقدمة 🔍",
    textToImage: "تحويل نص إلى صورة",
    advancedImageTools: "أدوات صورية متقدمة",
    textSummary: "ملخص النصوص 📑",
    sentimentAnalysis: "تحليل المشاعر 🤔",
    contextualQA: "أسئلة وأجوبة سياقية 📚",
    creativeWriting: "كتابة إبداعية ✍️",
    blogIdeas: "اقتراح أفكار للمدونات 💡",
    socialMedia: "مشاركات لوسائل التواصل 📢",
    headlines: "مولد العناوين الرئيسية 📰",
    movieSuggestions: "مقترح أفلام 🎬",
    tradingAnalyzer: "محلل التداول بالذكاء الاصطناعي",
    explosiveCoins: "العملات الانفجارية 💥",
    comingSoon: "سيتم إضافتها قريباً...",
    enterText: "أدخل النص هنا...",
    send: "إرسال",
  },
  en: {
    chatTools: "Chat Tools",
    imageTools: "Image Tools",
    aiContentCreation: "AI Content Creation Tools",
    aiTrading: "AI Trading",
    interactiveChat: "Interactive Chat",
    advancedTextTools: "Advanced Text Tools 🔍",
    textToImage: "Text to Image",
    advancedImageTools: "Advanced Image Tools",
    textSummary: "Text Summary 📑",
    sentimentAnalysis: "Sentiment Analysis 🤔",
    contextualQA: "Contextual Q&A 📚",
    creativeWriting: "Creative Writing ✍️",
    blogIdeas: "Blog Ideas 💡",
    socialMedia: "Social Media Posts 📢",
    headlines: "Headlines Generator 📰",
    movieSuggestions: "Movie Suggestions 🎬",
    tradingAnalyzer: "AI Trading Analyzer",
    explosiveCoins: "Explosive Coins 💥",
    comingSoon: "Coming Soon...",
    enterText: "Enter text here...",
    send: "Send",
  },
  de: {
    chatTools: "Chat-Tools",
    imageTools: "Bild-Tools",
    aiContentCreation: "KI-Content-Erstellung",
    aiTrading: "KI-Trading",
    interactiveChat: "Interaktiver Chat",
    advancedTextTools: "Erweiterte Text-Tools 🔍",
    textToImage: "Text zu Bild",
    advancedImageTools: "Erweiterte Bild-Tools",
    textSummary: "Text-Zusammenfassung 📑",
    sentimentAnalysis: "Sentiment-Analyse 🤔",
    contextualQA: "Kontextuelle F&A 📚",
    creativeWriting: "Kreatives Schreiben ✍️",
    blogIdeas: "Blog-Ideen 💡",
    socialMedia: "Social Media Posts 📢",
    headlines: "Schlagzeilen-Generator 📰",
    movieSuggestions: "Film-Vorschläge 🎬",
    tradingAnalyzer: "KI-Trading-Analyzer",
    explosiveCoins: "Explosive Coins 💥",
    comingSoon: "Demnächst verfügbar...",
    enterText: "Text hier eingeben...",
    send: "Senden",
  },
  ch: {
    chatTools: "聊天工具",
    imageTools: "图像工具",
    aiContentCreation: "AI内容创作工具",
    aiTrading: "AI交易",
    interactiveChat: "互动聊天",
    advancedTextTools: "高级文本工具 🔍",
    textToImage: "文本转图像",
    advancedImageTools: "高级图像工具",
    textSummary: "文本摘要 📑",
    sentimentAnalysis: "情感分析 🤔",
    contextualQA: "上下文问答 📚",
    creativeWriting: "创意写作 ✍️",
    blogIdeas: "博客创意 💡",
    socialMedia: "社交媒体帖子 📢",
    headlines: "标题生成器 📰",
    movieSuggestions: "电影推荐 🎬",
    tradingAnalyzer: "AI交易分析器",
    explosiveCoins: "爆炸性硬币 💥",
    comingSoon: "即将推出...",
    enterText: "在此输入文本...",
    send: "发送",
  },
  fr: {
    chatTools: "Outils de Chat",
    imageTools: "Outils d'Image",
    aiContentCreation: "Outils de Création de Contenu IA",
    aiTrading: "Trading IA",
    interactiveChat: "Chat Interactif",
    advancedTextTools: "Outils de Texte Avancés 🔍",
    textToImage: "Texte vers Image",
    advancedImageTools: "Outils d'Image Avancés",
    textSummary: "Résumé de Texte 📑",
    sentimentAnalysis: "Analyse de Sentiment 🤔",
    contextualQA: "Q&R Contextuelle 📚",
    creativeWriting: "Écriture Créative ✍️",
    blogIdeas: "Idées de Blog 💡",
    socialMedia: "Publications Réseaux Sociaux 📢",
    headlines: "Générateur de Titres 📰",
    movieSuggestions: "Suggestions de Films 🎬",
    tradingAnalyzer: "Analyseur de Trading IA",
    explosiveCoins: "Pièces Explosives 💥",
    comingSoon: "Bientôt disponible...",
    enterText: "Entrez le texte ici...",
    send: "Envoyer",
  },
  ru: {
    chatTools: "Инструменты Чата",
    imageTools: "Инструменты Изображений",
    aiContentCreation: "Инструменты Создания Контента ИИ",
    aiTrading: "ИИ Трейдинг",
    interactiveChat: "Интерактивный Чат",
    advancedTextTools: "Продвинутые Текстовые Инструменты 🔍",
    textToImage: "Текст в Изображение",
    advancedImageTools: "Продвинутые Инструменты Изображений",
    textSummary: "Резюме Текста 📑",
    sentimentAnalysis: "Анализ Настроений 🤔",
    contextualQA: "Контекстные Вопросы и Ответы 📚",
    creativeWriting: "Творческое Письмо ✍️",
    blogIdeas: "Идеи для Блога 💡",
    socialMedia: "Посты в Соцсетях 📢",
    headlines: "Генератор Заголовков 📰",
    movieSuggestions: "Предложения Фильмов 🎬",
    tradingAnalyzer: "ИИ Анализатор Трейдинга",
    explosiveCoins: "Взрывные Монеты 💥",
    comingSoon: "Скоро будет доступно...",
    enterText: "Введите текст здесь...",
    send: "Отправить",
  },
}

const languageFlags = {
  ar: "🇸🇦",
  en: "🇺🇸",
  de: "🇩🇪",
  ch: "🇨🇳",
  fr: "🇫🇷",
  ru: "🇷🇺",
}

export default function TelegramMiniApp() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("home")
  const [selectedBot, setSelectedBot] = useState<BotType>("llama-b8")
  const [isTyping, setIsTyping] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, text: "مرحباً! كيف يمكنني مساعدتك اليوم؟", sender: "bot", timestamp: "10:30" },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [textToImageInput, setTextToImageInput] = useState("")
  const [tradingSymbol, setTradingSymbol] = useState("")
  const [selectedTimeframe, setSelectedTimeframe] = useState("")
  const [contentInput, setContentInput] = useState("")
  const [currentLanguage, setCurrentLanguage] = useState<Language>("ar")
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false)
  const [textSummaryInput, setTextSummaryInput] = useState("")
  const [sentimentInput, setSentimentInput] = useState("")
  const [contextualInput, setContextualInput] = useState("")

  const t = translations[currentLanguage]

  const botConfigs = {
    "llama-b8": {
      name: "Llama B8",
      avatar: "/robot-avatar.png",
      color: "purple",
    },
    "llama-b70": {
      name: "Llama B70",
      avatar: "/robot-llama-b70.png",
      color: "blue",
    },
    "giminai-flash": {
      name: "Giminai Flash-2.0",
      avatar: "/robot-giminai.png",
      color: "red",
    },
  }

  const timeframes = [
    { label: "5 دقائق", value: "5m" },
    { label: "15 دقيقة", value: "15m" },
    { label: "30 دقيقة", value: "30m" },
    { label: "ساعة", value: "1h" },
    { label: "4 ساعات", value: "4h" },
    { label: "يوم", value: "1d" },
    { label: "أسبوع", value: "1w" },
  ]

  const movieGenres = [
    { name: "عشوائي", emoji: "🎲" },
    { name: "أكشن", emoji: "💥" },
    { name: "مغامرة", emoji: "🗺️" },
    { name: "رسوم متحركة", emoji: "🎨" },
    { name: "كوميديا", emoji: "😂" },
    { name: "جريمة", emoji: "🕵️‍♂️" },
    { name: "وثائقي", emoji: "📄" },
    { name: "دراما", emoji: "🎭" },
    { name: "عائلي", emoji: "👨‍👩‍👧‍👦" },
    { name: "خيال", emoji: "✨" },
    { name: "تاريخ", emoji: "📜" },
    { name: "رعب", emoji: "👻" },
    { name: "موسيقى", emoji: "🎵" },
    { name: "غموض", emoji: "❓" },
    { name: "رومانسية", emoji: "❤️" },
    { name: "خيال علمي", emoji: "🚀" },
    { name: "فيلم تلفزيوني", emoji: "📺" },
    { name: "إثارة", emoji: "⚡" },
    { name: "حرب", emoji: "🪖" },
    { name: "ويسترن", emoji: "🤠" },
  ]

  useEffect(() => {
    if (currentScreen === "chat-interface") {
      const timer = setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
        }, 2000)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentScreen])

  const sendMessage = () => {
    if (inputMessage.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: inputMessage,
        sender: "user" as const,
        timestamp: new Date().toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setInputMessage("")

      // Simulate bot response
      setTimeout(() => {
        setIsTyping(true)
        setTimeout(() => {
          setIsTyping(false)
          const botResponse = {
            id: messages.length + 2,
            text: "شكراً لك على رسالتك! سأساعدك في أقرب وقت ممكن.",
            sender: "bot" as const,
            timestamp: new Date().toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" }),
          }
          setMessages((prev) => [...prev, botResponse])
        }, 2000)
      }, 1000)
    }
  }

  const selectBot = (bot: BotType) => {
    setSelectedBot(bot)
    setCurrentScreen("chat-interface")
    // Reset messages for new bot
    setMessages([{ id: 1, text: "مرحباً! كيف يمكنني مساعدتك اليوم؟", sender: "bot", timestamp: "10:30" }])
  }

  const renderHomeScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        {/* Chat Tools */}
        <button
          onClick={() => setCurrentScreen("chat-tools")}
          className="w-full bg-gradient-to-r from-amber-700/80 to-amber-600/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-600/20 hover:from-amber-700/90 hover:to-amber-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/30 rounded-2xl flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-amber-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.chatTools}</h2>
          </div>
        </button>

        {/* Image Tools */}
        <button
          onClick={() => setCurrentScreen("image-tools")}
          className="w-full bg-gradient-to-r from-slate-700/80 to-slate-600/80 backdrop-blur-sm rounded-3xl p-6 border border-slate-600/20 hover:from-slate-700/90 hover:to-slate-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-slate-500/30 rounded-2xl flex items-center justify-center">
              <ImageIcon className="w-6 h-6 text-slate-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.imageTools}</h2>
          </div>
        </button>

        {/* AI Content Creation Tools */}
        <button
          onClick={() => setCurrentScreen("content-tools")}
          className="w-full bg-gradient-to-r from-cyan-700/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 border border-cyan-600/20 hover:from-cyan-700/90 hover:to-blue-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/30 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-cyan-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.aiContentCreation}</h2>
          </div>
        </button>

        {/* AI Trading */}
        <button
          onClick={() => setCurrentScreen("ai-trading")}
          className="w-full bg-gradient-to-r from-purple-700/80 to-indigo-600/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-600/20 hover:from-purple-700/90 hover:to-indigo-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/30 rounded-2xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.aiTrading}</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderChatToolsScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("home")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.chatTools}</h1>
        </div>

        <button
          onClick={() => setCurrentScreen("llama-chat")}
          className="w-full bg-gradient-to-r from-amber-700/80 to-amber-600/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-600/20 hover:from-amber-700/90 hover:to-amber-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/30 rounded-2xl flex items-center justify-center">
              <Bot className="w-6 h-6 text-amber-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.interactiveChat}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("advanced-text-tools")}
          className="w-full bg-gradient-to-r from-amber-700/80 to-orange-600/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-600/20 hover:from-amber-700/90 hover:to-orange-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/30 rounded-2xl flex items-center justify-center">
              <Search className="w-6 h-6 text-amber-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.advancedTextTools}</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderLlamaChatScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("chat-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.interactiveChat}</h1>
        </div>

        <button
          onClick={() => selectBot("llama-b8")}
          className="w-full bg-gradient-to-r from-purple-700/80 to-indigo-600/80 backdrop-blur-sm rounded-3xl p-6 border border-purple-600/20 hover:from-purple-700/90 hover:to-indigo-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-purple-500/30 rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="/robot-avatar.png"
                alt="Llama B8"
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white">Llama B8</h2>
          </div>
        </button>

        <button
          onClick={() => selectBot("llama-b70")}
          className="w-full bg-gradient-to-r from-blue-700/80 to-cyan-600/80 backdrop-blur-sm rounded-3xl p-6 border border-blue-600/20 hover:from-blue-700/90 hover:to-cyan-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500/30 rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="/robot-llama-b70.png"
                alt="Llama B70"
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white">Llama B70</h2>
          </div>
        </button>

        <button
          onClick={() => selectBot("giminai-flash")}
          className="w-full bg-gradient-to-r from-red-700/80 to-orange-600/80 backdrop-blur-sm rounded-3xl p-6 border border-red-600/20 hover:from-red-700/90 hover:to-orange-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-red-500/30 rounded-2xl flex items-center justify-center overflow-hidden">
              <Image
                src="/robot-giminai.png"
                alt="Giminai Flash-2.0"
                width={48}
                height={48}
                className="rounded-lg object-cover"
              />
            </div>
            <h2 className="text-xl font-semibold text-white">Giminai Flash-2.0</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderChatInterface = () => {
    const currentBot = botConfigs[selectedBot]

    return (
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 px-4 py-3 flex items-center space-x-3">
          <button
            onClick={() => setCurrentScreen("llama-chat")}
            className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-4 h-4 text-white" />
          </button>
          <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-600">
            <Image
              src={currentBot.avatar || "/placeholder.svg"}
              alt={currentBot.name}
              width={40}
              height={40}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">{currentBot.name}</h3>
            <p className="text-green-400 text-xs">متصل</p>
          </div>
          <button className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center">
            <MoreVertical className="w-4 h-4 text-white" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 px-4 py-4 space-y-4 overflow-y-auto">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-xs px-4 py-2 rounded-2xl ${
                  message.sender === "user"
                    ? "bg-cyan-600 text-white rounded-br-md"
                    : "bg-slate-700 text-white rounded-bl-md"
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-slate-700 text-white px-4 py-2 rounded-2xl rounded-bl-md">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
                <p className="text-xs opacity-70 mt-1">جاري الكتابة...</p>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="bg-slate-800/90 backdrop-blur-md border-t border-slate-700/50 px-4 py-3">
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && sendMessage()}
              placeholder="اكتب رسالة..."
              className="flex-1 bg-slate-700/50 text-white placeholder-gray-400 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500"
            />
            <button
              onClick={sendMessage}
              className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center hover:bg-cyan-700 transition-colors"
            >
              <Send className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    )
  }

  const renderImageToolsScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("home")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.imageTools}</h1>
        </div>

        <button
          onClick={() => setCurrentScreen("text-to-image")}
          className="w-full bg-gradient-to-r from-emerald-700/80 to-teal-600/80 backdrop-blur-sm rounded-3xl p-6 border border-emerald-600/20 hover:from-emerald-700/90 hover:to-teal-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-emerald-500/30 rounded-2xl flex items-center justify-center">
              <Wand2 className="w-6 h-6 text-emerald-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.textToImage}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("coming-soon")}
          className="w-full bg-gradient-to-r from-violet-700/80 to-purple-600/80 backdrop-blur-sm rounded-3xl p-6 border border-violet-600/20 hover:from-violet-700/90 hover:to-purple-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-violet-500/30 rounded-2xl flex items-center justify-center">
              <Settings className="w-6 h-6 text-violet-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.advancedImageTools}</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderTextToImageScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("image-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.textToImage}</h1>
        </div>

        <button
          onClick={() => setCurrentScreen("stable-diffusion")}
          className="w-full bg-gradient-to-r from-pink-700/80 to-rose-600/80 backdrop-blur-sm rounded-3xl p-6 border border-pink-600/20 hover:from-pink-700/90 hover:to-rose-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-pink-500/30 rounded-2xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-pink-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">Stable Diffusion V1.4</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderStableDiffusionScreen = () => (
    <div className="flex-1 flex flex-col relative">
      {/* Creative lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/10 to-blue-900/20"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 right-8 w-24 h-24 bg-gradient-to-r from-pink-500/20 to-purple-500/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Header */}
      <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 px-4 py-3 flex items-center space-x-3 relative z-10">
        <button
          onClick={() => setCurrentScreen("text-to-image")}
          className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <h3 className="text-white font-semibold text-lg">Stable Diffusion 1.4</h3>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          {/* Input field */}
          <div className="relative">
            <input
              type="text"
              value={textToImageInput}
              onChange={(e) => setTextToImageInput(e.target.value)}
              placeholder="Enter the text you want to convert..."
              className="w-full bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-pink-500 border border-slate-600/30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/10 to-purple-500/10 rounded-2xl pointer-events-none"></div>
          </div>

          {/* Output area */}
          <div className="relative">
            <div className="w-full h-64 bg-slate-700/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 flex items-center justify-center">
              <div className="text-center">
                <Sparkles className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-400">Generated image will appear here</p>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-pink-500/5 rounded-2xl pointer-events-none"></div>
          </div>

          {/* Generate button */}
          <button className="w-full bg-gradient-to-r from-pink-600 to-purple-600 text-white font-semibold py-4 rounded-2xl hover:from-pink-700 hover:to-purple-700 transition-all shadow-lg shadow-pink-500/25">
            Generate Image
          </button>
        </div>
      </div>
    </div>
  )

  const renderAdvancedTextToolsScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("chat-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.advancedTextTools}</h1>
        </div>

        <button
          onClick={() => setCurrentScreen("text-summary")}
          className="w-full bg-gradient-to-r from-amber-700/80 to-orange-600/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-600/20 hover:from-amber-700/90 hover:to-orange-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/30 rounded-2xl flex items-center justify-center">
              <FileText className="w-6 h-6 text-amber-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.textSummary}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("sentiment-analysis")}
          className="w-full bg-gradient-to-r from-amber-700/80 to-orange-600/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-600/20 hover:from-amber-700/90 hover:to-orange-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/30 rounded-2xl flex items-center justify-center">
              <Brain className="w-6 h-6 text-amber-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.sentimentAnalysis}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("contextual-qa")}
          className="w-full bg-gradient-to-r from-amber-700/80 to-orange-600/80 backdrop-blur-sm rounded-3xl p-6 border border-amber-600/20 hover:from-amber-700/90 hover:to-orange-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-amber-500/30 rounded-2xl flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-amber-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.contextualQA}</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderTextSummaryScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("advanced-text-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.textSummary}</h1>
        </div>

        <div className="bg-gradient-to-r from-amber-800/50 to-orange-700/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-600/30">
          <div className="text-center mb-6">
            <FileText className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.textSummary}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "أرسل لي نصاً وسأقدم لك ملخصاً موجزاً. مثال: 'لخص النص التالي...' أو أرسل لي النص مباشرة."
              : "Send me a text and I'll provide you with a brief summary. Example: 'Summarize the following text...' or send me the text directly."}
          </p>

          <div className="space-y-4">
            <textarea
              value={textSummaryInput}
              onChange={(e) => setTextSummaryInput(e.target.value)}
              placeholder={t.enterText}
              className="w-full bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-600/30 min-h-[120px] resize-none"
            />
            <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all">
              {t.send}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderSentimentAnalysisScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("advanced-text-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.sentimentAnalysis}</h1>
        </div>

        <div className="bg-gradient-to-r from-amber-800/50 to-orange-700/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-600/30">
          <div className="text-center mb-6">
            <Brain className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.sentimentAnalysis}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "أرسل لي نصاً وسأقوم بتحليل مشاعره (إيجابي، سلبي، أو محايد). مثال: 'حلل مشاعر هذا النص: أنا أحب هذا المنتج!'"
              : "Send me a text and I'll analyze its sentiment (positive, negative, or neutral). Example: 'Analyze the sentiment of this text: I love this product!'"}
          </p>

          <div className="space-y-4">
            <textarea
              value={sentimentInput}
              onChange={(e) => setSentimentInput(e.target.value)}
              placeholder={t.enterText}
              className="w-full bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-600/30 min-h-[120px] resize-none"
            />
            <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all">
              {t.send}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContextualQAScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("advanced-text-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.contextualQA}</h1>
        </div>

        <div className="bg-gradient-to-r from-amber-800/50 to-orange-700/50 backdrop-blur-sm rounded-2xl p-6 border border-amber-600/30">
          <div className="text-center mb-6">
            <BookOpen className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.contextualQA}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "أرسل لي نصاً بالصيغة التالية: السياق: [السياق الخاص بك هنا] السؤال: [سؤالك هنا] وسأجيب على سؤالك بناءً على السياق المقدم فقط."
              : "Send me text in the following format: Context: [Your context here] Question: [Your question here] and I'll answer your question based only on the provided context."}
          </p>

          <div className="space-y-4">
            <textarea
              value={contextualInput}
              onChange={(e) => setContextualInput(e.target.value)}
              placeholder={t.enterText}
              className="w-full bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-amber-500 border border-slate-600/30 min-h-[120px] resize-none"
            />
            <button className="w-full bg-gradient-to-r from-amber-600 to-orange-600 text-white font-semibold py-3 rounded-xl hover:from-amber-700 hover:to-orange-700 transition-all">
              {t.send}
            </button>
          </div>
        </div>
      </div>
    </div>
  )

  const renderContentToolsScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("home")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.aiContentCreation}</h1>
        </div>

        <button
          onClick={() => setCurrentScreen("creative-writing")}
          className="w-full bg-gradient-to-r from-cyan-700/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 border border-cyan-600/20 hover:from-cyan-700/90 hover:to-blue-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/30 rounded-2xl flex items-center justify-center">
              <PenTool className="w-6 h-6 text-cyan-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.creativeWriting}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("blog-ideas")}
          className="w-full bg-gradient-to-r from-cyan-700/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 border border-cyan-600/20 hover:from-cyan-700/90 hover:to-blue-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/30 rounded-2xl flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-cyan-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.blogIdeas}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("social-media")}
          className="w-full bg-gradient-to-r from-cyan-700/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 border border-cyan-600/20 hover:from-cyan-700/90 hover:to-blue-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/30 rounded-2xl flex items-center justify-center">
              <Megaphone className="w-6 h-6 text-cyan-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.socialMedia}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("headlines")}
          className="w-full bg-gradient-to-r from-cyan-700/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 border border-cyan-600/20 hover:from-cyan-700/90 hover:to-blue-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/30 rounded-2xl flex items-center justify-center">
              <Newspaper className="w-6 h-6 text-cyan-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.headlines}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("movie-suggestions")}
          className="w-full bg-gradient-to-r from-cyan-700/80 to-blue-600/80 backdrop-blur-sm rounded-3xl p-6 border border-cyan-600/20 hover:from-cyan-700/90 hover:to-blue-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-cyan-500/30 rounded-2xl flex items-center justify-center">
              <Film className="w-6 h-6 text-cyan-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.movieSuggestions}</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderCreativeWritingScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("content-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.creativeWriting}</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-6">
          <div className="text-center mb-6">
            <PenTool className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.creativeWriting}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "يمكنني مساعدتك في كتابة نصوص إبداعية، قصائد، أو مقالات. مثال: 'اكتب قصة قصيرة عن محقق في المستقبل.'"
              : "I can help you write creative texts, poems, or articles. Example: 'Write a short story about a detective in the future.'"}
          </p>
          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            placeholder={t.enterText}
            className="w-full bg-slate-700/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-600/30 resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderBlogIdeasScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("content-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.blogIdeas}</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-6">
          <div className="text-center mb-6">
            <Lightbulb className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.blogIdeas}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "يمكنني اقتراح أفكار لمقالات المدونة لأي موضوع. مثال: 'اقتراح 5 عناوين للمدونة حول العمل عن بعد.'"
              : "I can suggest ideas for blog articles on any topic. Example: 'Suggest 5 blog titles about working remotely.'"}
          </p>
          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            placeholder={t.enterText}
            className="w-full bg-slate-700/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-600/30 resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderSocialMediaScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("content-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.socialMedia}</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-6">
          <div className="text-center mb-6">
            <Megaphone className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.socialMedia}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "يمكنني إنشاء منشورات جذابة لمنصات التواصل الاجتماعي. مثال: 'اكتب تغريدة حول إطلاق آيفون الجديد.'"
              : "I can create engaging posts for social media platforms. Example: 'Write a tweet about the launch of the new iPhone.'"}
          </p>
          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            placeholder={t.enterText}
            className="w-full bg-slate-700/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-600/30 resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderHeadlinesScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("content-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.headlines}</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30 mb-6">
          <div className="text-center mb-6">
            <Newspaper className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.headlines}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "يمكنني توليد عناوين رئيسية جذابة وفعالة للمحتوى الخاص بك. مثال: 'توليد 3 عناوين لمقال حول العملات المشفرة.'"
              : "I can generate attractive and effective headlines for your content. Example: 'Generate 3 headlines for an article about cryptocurrencies.'"}
          </p>
          <textarea
            value={contentInput}
            onChange={(e) => setContentInput(e.target.value)}
            placeholder={t.enterText}
            className="w-full bg-slate-700/50 text-white placeholder-gray-400 rounded-xl px-4 py-3 h-32 focus:outline-none focus:ring-2 focus:ring-cyan-500 border border-slate-600/30 resize-none"
          />
        </div>
      </div>
    </div>
  )

  const renderMovieSuggestionsScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("content-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.movieSuggestions}</h1>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700/30">
          <div className="text-center mb-6">
            <Film className="w-16 h-16 text-cyan-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-white mb-4">{t.movieSuggestions}</h2>
          </div>
          <p className="text-gray-300 text-center leading-relaxed mb-6">
            {currentLanguage === "ar"
              ? "يمكنني مساعدتك في العثور على أفلام مشهورة بناءً على التصنيف"
              : "I can help you find popular movies based on genre"}
          </p>

          <h3 className="text-white font-semibold text-center mb-4">
            {currentLanguage === "ar" ? "إختر تصنيفاً" : "Choose a genre"}
          </h3>

          <div className="grid grid-cols-5 gap-2">
            {movieGenres.map((genre, index) => (
              <button
                key={index}
                className="bg-slate-700/50 hover:bg-slate-600/50 rounded-lg p-3 border border-slate-600/30 transition-all hover:scale-105 flex flex-col items-center justify-center min-h-[60px]"
              >
                <span className="text-lg mb-1">{genre.emoji}</span>
                <span className="text-xs text-white text-center leading-tight">{genre.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )

  const renderAITradingScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto space-y-4">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("home")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.aiTrading}</h1>
        </div>

        <button
          onClick={() => setCurrentScreen("trading-analyzer")}
          className="w-full bg-gradient-to-r from-blue-700/80 to-cyan-600/80 backdrop-blur-sm rounded-3xl p-6 border border-blue-600/20 hover:from-blue-700/90 hover:to-cyan-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-blue-500/30 rounded-2xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-blue-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.tradingAnalyzer}</h2>
          </div>
        </button>

        <button
          onClick={() => setCurrentScreen("explosive-coins")}
          className="w-full bg-gradient-to-r from-orange-700/80 to-red-600/80 backdrop-blur-sm rounded-3xl p-6 border border-orange-600/20 hover:from-orange-700/90 hover:to-red-600/90 transition-all"
        >
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-orange-500/30 rounded-2xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-orange-200" />
            </div>
            <h2 className="text-xl font-semibold text-white">{t.explosiveCoins}</h2>
          </div>
        </button>
      </div>
    </div>
  )

  const renderTradingAnalyzerScreen = () => (
    <div className="flex-1 flex flex-col relative">
      {/* Creative blue lighting effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-cyan-900/10 to-slate-900/20"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
      <div
        className="absolute bottom-40 right-8 w-24 h-24 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-2xl animate-pulse"
        style={{ animationDelay: "1s" }}
      ></div>

      {/* Header */}
      <div className="bg-slate-800/90 backdrop-blur-md border-b border-slate-700/50 px-4 py-3 flex items-center space-x-3 relative z-10">
        <button
          onClick={() => setCurrentScreen("ai-trading")}
          className="w-8 h-8 bg-slate-700/50 rounded-full flex items-center justify-center"
        >
          <ArrowLeft className="w-4 h-4 text-white" />
        </button>
        <h3 className="text-white font-semibold text-lg">{t.tradingAnalyzer}</h3>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 py-8 relative z-10">
        <div className="max-w-md mx-auto space-y-6">
          {/* Trading Symbol Input */}
          <div className="relative">
            <input
              type="text"
              value={tradingSymbol}
              onChange={(e) => setTradingSymbol(e.target.value)}
              placeholder={
                currentLanguage === "ar"
                  ? "ادخل رمز التداول بهذا الشكل: BTC/USDT"
                  : "Enter trading symbol like this: BTC/USDT"
              }
              className="w-full bg-slate-700/50 backdrop-blur-sm text-white placeholder-gray-400 rounded-2xl px-6 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500 border border-slate-600/30"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-2xl pointer-events-none"></div>
          </div>

          {/* Timeframe Selection - Show only when symbol is entered */}
          {tradingSymbol && (
            <div className="space-y-4">
              <h3 className="text-white font-semibold text-center">
                {currentLanguage === "ar" ? "اختر الإطار الزمني" : "Select Timeframe"}
              </h3>
              <div className="grid grid-cols-4 gap-2">
                {timeframes.map((timeframe) => (
                  <button
                    key={timeframe.value}
                    onClick={() => setSelectedTimeframe(timeframe.value)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedTimeframe === timeframe.value
                        ? "bg-blue-600 text-white shadow-lg shadow-blue-500/25"
                        : "bg-slate-700/50 text-gray-300 hover:bg-slate-600/50"
                    }`}
                  >
                    {timeframe.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Analysis Display Area - Show when timeframe is selected */}
          {selectedTimeframe && (
            <div className="relative">
              <div className="bg-slate-700/30 backdrop-blur-sm rounded-2xl border border-slate-600/30 p-6 shadow-2xl">
                {/* Image placeholder */}
                <div className="w-full h-48 bg-slate-600/30 rounded-xl mb-4 flex items-center justify-center border border-slate-500/20">
                  <div className="text-center">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-400 text-sm">
                      {currentLanguage === "ar" ? "مخطط التحليل سيظهر هنا" : "Analysis chart will appear here"}
                    </p>
                  </div>
                </div>

                {/* Text analysis area */}
                <div className="bg-slate-600/20 rounded-xl p-4 min-h-[120px] border border-slate-500/20">
                  <p className="text-gray-400 text-center">
                    {currentLanguage === "ar"
                      ? "نتائج التحليل النصي ستظهر هنا"
                      : "Text analysis results will appear here"}
                  </p>
                </div>
              </div>
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-cyan-500/5 rounded-2xl pointer-events-none"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  const renderExplosiveCoinsScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("ai-trading")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.explosiveCoins}</h1>
        </div>

        <div className="text-center py-20">
          <div className="w-20 h-20 bg-orange-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-10 h-10 text-orange-400 animate-pulse" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{t.comingSoon}</h2>
          <p className="text-gray-400">
            {currentLanguage === "ar"
              ? "نعمل على تطوير أداة العملات الانفجارية لتجربة أفضل"
              : "We are developing the explosive coins tool for a better experience"}
          </p>
        </div>
      </div>
    </div>
  )

  const renderComingSoonScreen = () => (
    <div className="flex-1 px-6 pt-20 pb-24">
      <div className="max-w-md mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <button
            onClick={() => setCurrentScreen("image-tools")}
            className="w-10 h-10 bg-slate-700/50 rounded-full flex items-center justify-center"
          >
            <ArrowLeft className="w-5 h-5 text-white" />
          </button>
          <h1 className="text-2xl font-bold text-white">{t.advancedImageTools}</h1>
        </div>

        <div className="text-center py-20">
          <div className="w-20 h-20 bg-violet-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Settings className="w-10 h-10 text-violet-400 animate-spin" style={{ animationDuration: "3s" }} />
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">{t.comingSoon}</h2>
          <p className="text-gray-400">
            {currentLanguage === "ar"
              ? "نعمل على تطوير أدوات صورية متقدمة لتجربة أفضل"
              : "We are developing advanced image tools for a better experience"}
          </p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-800/20 to-slate-900"></div>

      {currentScreen === "home" && (
        <div className="absolute top-4 right-4 z-20">
          <div className="relative">
            <button
              onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
              className="w-10 h-10 bg-gray-600/40 rounded-full flex items-center justify-center hover:bg-gray-600/60 transition-all"
            >
              <Globe className="w-5 h-5 text-gray-300" />
            </button>

            {showLanguageDropdown && (
              <div className="absolute top-12 right-0 bg-slate-800/95 backdrop-blur-md rounded-xl border border-slate-700/50 shadow-xl min-w-[140px] overflow-hidden">
                {Object.entries(languageFlags).map(([lang, flag]) => (
                  <button
                    key={lang}
                    onClick={() => {
                      setCurrentLanguage(lang as Language)
                      setShowLanguageDropdown(false)
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-slate-700/50 transition-all flex items-center space-x-3 ${
                      currentLanguage === lang ? "bg-slate-700/30" : ""
                    }`}
                  >
                    <span className="text-lg">{flag}</span>
                    <span className="text-white font-medium">{lang.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {currentScreen === "home" && renderHomeScreen()}
        {currentScreen === "chat-tools" && renderChatToolsScreen()}
        {currentScreen === "llama-chat" && renderLlamaChatScreen()}
        {currentScreen === "chat-interface" && renderChatInterface()}
        {currentScreen === "image-tools" && renderImageToolsScreen()}
        {currentScreen === "text-to-image" && renderTextToImageScreen()}
        {currentScreen === "stable-diffusion" && renderStableDiffusionScreen()}
        {currentScreen === "content-tools" && renderContentToolsScreen()}
        {currentScreen === "coming-soon" && renderComingSoonScreen()}
        {currentScreen === "advanced-text-tools" && renderAdvancedTextToolsScreen()}
        {currentScreen === "text-summary" && renderTextSummaryScreen()}
        {currentScreen === "sentiment-analysis" && renderSentimentAnalysisScreen()}
        {currentScreen === "contextual-qa" && renderContextualQAScreen()}
        {currentScreen === "creative-writing" && renderCreativeWritingScreen()}
        {currentScreen === "blog-ideas" && renderBlogIdeasScreen()}
        {currentScreen === "social-media" && renderSocialMediaScreen()}
        {currentScreen === "headlines" && renderHeadlinesScreen()}
        {currentScreen === "movie-suggestions" && renderMovieSuggestionsScreen()}
        {currentScreen === "ai-trading" && renderAITradingScreen()}
        {currentScreen === "trading-analyzer" && renderTradingAnalyzerScreen()}
        {currentScreen === "explosive-coins" && renderExplosiveCoinsScreen()}
      </div>

      {/* AI badge in bottom right - only show on home screen */}
      {currentScreen === "home" && (
        <div className="fixed bottom-4 right-4 bg-slate-700/80 backdrop-blur-sm rounded-full px-3 py-1 border border-slate-600/30">
          <span className="text-xs text-slate-300 font-medium">ai</span>
        </div>
      )}
    </div>
  )
}
