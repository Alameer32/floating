import { Chatbot } from "@/components/chatbot"

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Demo content - you can remove this */}
      <div className="container mx-auto px-4 py-16">
        <div className="text-center space-y-6">
          <h1 className="text-4xl font-bold text-balance">Welcome to Your Site</h1>
          <p className="text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            This is a demo page showing the chatbot interface. The chatbot will appear as a floating button in the
            bottom right corner.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="font-semibold mb-2">Embeddable</h3>
              <p className="text-sm text-muted-foreground">Perfect for embedding in SharePoint or any website</p>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="font-semibold mb-2">Responsive</h3>
              <p className="text-sm text-muted-foreground">Works beautifully on desktop and mobile devices</p>
            </div>
            <div className="p-6 rounded-lg bg-card border">
              <h3 className="font-semibold mb-2">Modern Design</h3>
              <p className="text-sm text-muted-foreground">Clean, professional interface with smooth animations</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Component */}
      <Chatbot />
    </div>
  )
}
