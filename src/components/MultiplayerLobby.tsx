import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe, Users, Wifi, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MultiplayerLobbyProps {
  onCreateRoom: (hostName: string, rounds: number) => Promise<string | null>;
  onJoinRoom: (roomCode: string, guestName: string) => Promise<boolean>;
  onBack: () => void;
  loading: boolean;
  error: string | null;
}

export function MultiplayerLobby({ 
  onCreateRoom, 
  onJoinRoom, 
  onBack, 
  loading, 
  error 
}: MultiplayerLobbyProps) {
  const [mode, setMode] = useState<"choose" | "create" | "join">("choose");
  const [playerName, setPlayerName] = useState("");
  const [roomCode, setRoomCode] = useState("");
  const [rounds, setRounds] = useState(10);
  const [createdRoomCode, setCreatedRoomCode] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleCreate = async () => {
    if (!playerName.trim()) return;
    const code = await onCreateRoom(playerName.trim(), rounds);
    if (code) {
      setCreatedRoomCode(code);
    }
  };

  const handleJoin = async () => {
    if (!playerName.trim() || !roomCode.trim()) return;
    const success = await onJoinRoom(roomCode.trim(), playerName.trim());
    if (!success && error) {
      toast({
        title: "Erreur",
        description: error,
        variant: "destructive",
      });
    }
  };

  const copyRoomCode = () => {
    if (createdRoomCode) {
      navigator.clipboard.writeText(createdRoomCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Code copié !",
        description: "Partage ce code avec ton adversaire",
      });
    }
  };

  if (createdRoomCode) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg animate-fade-in">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-float">
              <Wifi className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl font-black mb-3">
              <span className="text-gradient-gold">Room créée !</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              En attente d'un adversaire...
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 card-shadow border border-border">
            <p className="text-center text-muted-foreground mb-4">Code de la room :</p>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="text-5xl font-black tracking-[0.3em] text-primary">
                {createdRoomCode}
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={copyRoomCode}
                className="shrink-0"
              >
                {copied ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground animate-pulse">
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0.2s" }} />
              <span className="ml-2">En attente...</span>
            </div>
          </div>

          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full mt-6"
          >
            Annuler
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "choose") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-lg animate-fade-in">
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-float">
              <Globe className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-5xl font-black mb-3">
              <span className="text-gradient-gold">Mode 1v1</span>
            </h1>
            <p className="text-muted-foreground text-lg">
              Affronte un ami en ligne !
            </p>
          </div>

          <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 card-shadow border border-border space-y-4">
            <Button
              onClick={() => setMode("create")}
              className="w-full py-6 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold"
            >
              <Users className="w-6 h-6 mr-3" />
              Créer une room
            </Button>

            <Button
              onClick={() => setMode("join")}
              variant="outline"
              className="w-full py-6 text-xl font-bold rounded-xl border-2"
            >
              <Wifi className="w-6 h-6 mr-3" />
              Rejoindre une room
            </Button>
          </div>

          <Button
            variant="ghost"
            onClick={onBack}
            className="w-full mt-6"
          >
            ← Retour
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-lg animate-fade-in">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/20 mb-6 animate-float">
            {mode === "create" ? <Users className="w-10 h-10 text-primary" /> : <Wifi className="w-10 h-10 text-primary" />}
          </div>
          <h1 className="text-4xl font-black mb-3">
            <span className="text-gradient-gold">
              {mode === "create" ? "Créer une room" : "Rejoindre"}
            </span>
          </h1>
        </div>

        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 card-shadow border border-border">
          <div className="space-y-4 mb-6">
            <div>
              <label className="text-sm uppercase tracking-wider font-medium text-muted-foreground mb-2 block">
                Ton pseudo
              </label>
              <input
                type="text"
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                placeholder="Entre ton pseudo"
                className="w-full px-4 py-4 bg-background border-2 border-border rounded-xl outline-none focus:border-primary transition-colors"
              />
            </div>

            {mode === "join" && (
              <div>
                <label className="text-sm uppercase tracking-wider font-medium text-muted-foreground mb-2 block">
                  Code de la room
                </label>
                <input
                  type="text"
                  value={roomCode}
                  onChange={(e) => setRoomCode(e.target.value.toUpperCase())}
                  placeholder="Ex: ABC123"
                  maxLength={6}
                  className="w-full px-4 py-4 bg-background border-2 border-border rounded-xl outline-none focus:border-primary transition-colors text-center text-2xl tracking-[0.2em] font-bold uppercase"
                />
              </div>
            )}

            {mode === "create" && (
              <div>
                <label className="text-sm uppercase tracking-wider font-medium text-muted-foreground mb-2 block">
                  Nombre de pays
                </label>
                <div className="flex flex-wrap gap-3">
                  {[10, 20, 30, 40, 50].map((num) => (
                    <button
                      key={num}
                      onClick={() => setRounds(num)}
                      className={`flex-1 min-w-[60px] py-3 rounded-xl font-bold text-lg transition-all ${
                        rounds === num
                          ? "bg-primary text-primary-foreground glow-gold"
                          : "bg-muted text-muted-foreground hover:bg-muted/80"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {error && (
            <p className="text-destructive text-center mb-4">{error}</p>
          )}

          <Button
            onClick={mode === "create" ? handleCreate : handleJoin}
            disabled={loading || !playerName.trim() || (mode === "join" && !roomCode.trim())}
            className="w-full py-6 text-xl font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-xl glow-gold disabled:opacity-50"
          >
            {loading ? "Chargement..." : mode === "create" ? "Créer la room" : "Rejoindre"}
          </Button>
        </div>

        <Button
          variant="ghost"
          onClick={() => setMode("choose")}
          className="w-full mt-6"
        >
          ← Retour
        </Button>
      </div>
    </div>
  );
}
