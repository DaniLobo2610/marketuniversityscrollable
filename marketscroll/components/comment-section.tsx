"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { MessageCircle, Send } from "lucide-react"

interface Comment {
  id: number
  author: string
  content: string
  timestamp: string
}

interface CommentSectionProps {
  productId: number
}

export function CommentSection({ productId }: CommentSectionProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [newComment, setNewComment] = useState("")
  const [authorName, setAuthorName] = useState("")

  // Cargar comentarios del localStorage al montar el componente
  useEffect(() => {
    const savedComments = localStorage.getItem(`comments-${productId}`)
    if (savedComments) {
      setComments(JSON.parse(savedComments))
    } else {
      // Comentarios de ejemplo
      const exampleComments = [
        {
          id: 1,
          author: "María González",
          content: "Excelente producto, muy buena calidad. Lo recomiendo totalmente.",
          timestamp: "2024-01-15T10:30:00Z",
        },
        {
          id: 2,
          author: "Carlos Rodríguez",
          content: "Perfecto para mis clases, muy útil y resistente.",
          timestamp: "2024-01-14T15:45:00Z",
        },
      ]
      setComments(exampleComments)
      localStorage.setItem(`comments-${productId}`, JSON.stringify(exampleComments))
    }
  }, [productId])

  const handleSubmitComment = () => {
    if (!newComment.trim() || !authorName.trim()) return

    const comment: Comment = {
      id: Date.now(),
      author: authorName,
      content: newComment,
      timestamp: new Date().toISOString(),
    }

    const updatedComments = [comment, ...comments]
    setComments(updatedComments)
    localStorage.setItem(`comments-${productId}`, JSON.stringify(updatedComments))

    setNewComment("")
    setAuthorName("")
  }

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleDateString("es-ES", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <MessageCircle className="w-5 h-5" />
          <h3 className="text-xl font-semibold">Comentarios ({comments.length})</h3>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Formulario para nuevo comentario */}
        <div className="space-y-4 p-4 bg-gray-50 rounded-lg">
          <h4 className="font-medium">Deja tu comentario</h4>
          <input
            type="text"
            placeholder="Tu nombre"
            value={authorName}
            onChange={(e) => setAuthorName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Textarea
            placeholder="Escribe tu comentario aquí..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={3}
          />
          <Button
            onClick={handleSubmitComment}
            disabled={!newComment.trim() || !authorName.trim()}
            className="w-full sm:w-auto"
          >
            <Send className="w-4 h-4 mr-2" />
            Publicar comentario
          </Button>
        </div>

        {/* Lista de comentarios */}
        <div className="space-y-4">
          {comments.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No hay comentarios aún. ¡Sé el primero en comentar!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.id} className="flex gap-3 p-4 border rounded-lg">
                <Avatar className="w-10 h-10">
                  <AvatarFallback>
                    {comment.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-medium text-sm">{comment.author}</span>
                    <span className="text-xs text-gray-500">{formatDate(comment.timestamp)}</span>
                  </div>
                  <p className="text-gray-700">{comment.content}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  )
}
