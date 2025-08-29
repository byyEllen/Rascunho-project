"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Search,
  User,
  LogOut,
  Filter,
  Sword,
  Shield,
  Zap,
  BookOpen,
  Users,
  Upload,
  FileText,
  Download,
  Heart,
} from "lucide-react"

interface Creature {
  id: number;
  name: string;
  description: string;
  image?: string;
  // outros campos...
}

const creatures = [
  // D&D 5e - Raças
  {
    id: 1,
    name: "Anão das Montanhas",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Montanhas Rochosas",
    image: "/bearded-dwarf-axe-mountain-armor.png",
    description: "Raça resistente e trabalhadora, mestres da forja e conhecedores dos segredos das montanhas.",
    stats: { strength: 80, speed: 40, magic: 30, intelligence: 70 },
  },
  {
    id: 2,
    name: "Elfo Alto",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Florestas Antigas",
    image: "/silver-haired-high-elf.png",
    description: "Elfos nobres com afinidade natural para magia arcana e longevidade excepcional.",
    stats: { strength: 50, speed: 70, magic: 90, intelligence: 85 },
  },
  {
    id: 3,
    name: "Halfling Pés Peludos",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Colinas Verdejantes",
    image: "/cheerful-halfling.png",
    description: "Pequenos humanoides conhecidos por sua sorte, coragem e amor pela comida.",
    stats: { strength: 40, speed: 80, magic: 40, intelligence: 60 },
  },
  {
    id: 4,
    name: "Humano Variante",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Cidades e Vilas",
    image: "/human-warrior.png",
    description: "A raça mais versátil e adaptável, capaz de se destacar em qualquer profissão.",
    stats: { strength: 70, speed: 70, magic: 70, intelligence: 70 },
  },
  {
    id: 5,
    name: "Draconato Dourado",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Terras Dracônicas",
    image: "/golden-dragonborn-paladin.png",
    description: "Descendentes de dragões dourados, com sopro de fogo e resistência natural.",
    stats: { strength: 85, speed: 60, magic: 75, intelligence: 65 },
  },
  {
    id: 6,
    name: "Gnomo da Floresta",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Florestas Encantadas",
    image: "/placeholder-7oey1.png",
    description: "Pequenos fey com conexão natural com animais e plantas da floresta.",
    stats: { strength: 30, speed: 60, magic: 85, intelligence: 80 },
  },
  {
    id: 7,
    name: "Meio-Elfo Bardo",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Tavernas e Cortes",
    image: "/placeholder-sarn6.png",
    description: "Híbridos carismáticos com talento natural para música e diplomacia.",
    stats: { strength: 60, speed: 65, magic: 75, intelligence: 75 },
  },
  {
    id: 8,
    name: "Meio-Orc Bárbaro",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Terras Selvagens",
    image: "/half-orc-barbarian.png",
    description: "Guerreiros ferozes com força brutal e resistência excepcional.",
    stats: { strength: 95, speed: 70, magic: 20, intelligence: 50 },
  },
  {
    id: 9,
    name: "Tiefling Infernal",
    type: "Raça",
    category: "races",
    system: "dnd5e",
    habitat: "Cidades Cosmopolitas",
    image: "/tiefling-warlock.png",
    description: "Descendentes de diabos com poderes infernais e aparência demoníaca.",
    stats: { strength: 60, speed: 65, magic: 85, intelligence: 80 },
  },

  // D&D 5e - Bestas e Animais
  {
    id: 100,
    name: "Lobo Cinzento",
    type: "Besta",
    category: "monsters",
    system: "dnd5e",
    habitat: "Florestas e Planícies",
    image: "/gray-wolf-forest.png",
    description: "Predador inteligente que caça em matilhas, conhecido por sua lealdade e ferocidade.",
    stats: { strength: 60, speed: 85, magic: 10, intelligence: 40 },
  },
  {
    id: 101,
    name: "Urso Pardo",
    type: "Besta",
    category: "monsters",
    system: "dnd5e",
    habitat: "Florestas Temperadas",
    image: "/brown-bear-standing.png",
    description: "Gigante das florestas com força devastadora e temperamento imprevisível.",
    stats: { strength: 90, speed: 50, magic: 5, intelligence: 30 },
  },
  {
    id: 102,
    name: "Leão Majestoso",
    type: "Besta",
    category: "monsters",
    system: "dnd5e",
    habitat: "Savanas",
    image: "/majestic-lion-savanna.png",
    description: "Rei das savanas, caçador supremo com rugido que ecoa por quilômetros.",
    stats: { strength: 80, speed: 75, magic: 5, intelligence: 35 },
  },
  {
    id: 103,
    name: "Águia Dourada",
    type: "Besta",
    category: "monsters",
    system: "dnd5e",
    habitat: "Montanhas Altas",
    image: "/placeholder-giuoz.png",
    description: "Ave de rapina com visão aguçada e voo gracioso pelas alturas.",
    stats: { strength: 40, speed: 95, magic: 10, intelligence: 45 },
  },
  {
    id: 104,
    name: "Tubarão Branco",
    type: "Besta",
    category: "monsters",
    system: "dnd5e",
    habitat: "Oceanos Profundos",
    image: "/placeholder-ma2mn.png",
    description: "Predador dos mares com mandíbulas poderosas e instintos assassinos.",
    stats: { strength: 85, speed: 80, magic: 0, intelligence: 25 },
  },

  // D&D 5e - Humanoides
  {
    id: 105,
    name: "Orc Guerreiro",
    type: "Humanoide",
    category: "monsters",
    system: "dnd5e",
    habitat: "Terras Devastadas",
    image: "/orc-warrior.png",
    description: "Bárbaro brutal com sede de batalha e força descomunal.",
    stats: { strength: 85, speed: 60, magic: 15, intelligence: 40 },
  },
  {
    id: 106,
    name: "Goblin Ladino",
    type: "Humanoide",
    category: "monsters",
    system: "dnd5e",
    habitat: "Cavernas e Ruínas",
    image: "/sneaky-goblin.png",
    description: "Pequeno mas astuto, especialista em emboscadas e travessuras.",
    stats: { strength: 30, speed: 80, magic: 20, intelligence: 55 },
  },
  {
    id: 107,
    name: "Kobold Armadilheiro",
    type: "Humanoide",
    category: "monsters",
    system: "dnd5e",
    habitat: "Túneis Subterrâneos",
    image: "/kobold-trap.png",
    description: "Réptil humanóide especialista em armadilhas e táticas de guerrilha.",
    stats: { strength: 25, speed: 70, magic: 30, intelligence: 65 },
  },
  {
    id: 108,
    name: "Gnoll Caçador",
    type: "Humanoide",
    category: "monsters",
    system: "dnd5e",
    habitat: "Savanas Áridas",
    image: "/placeholder-gztut.png",
    description: "Híbrido de hiena e humano, caçador implacável e canibal.",
    stats: { strength: 75, speed: 70, magic: 10, intelligence: 45 },
  },
  {
    id: 109,
    name: "Drow Assassino",
    type: "Humanoide",
    category: "monsters",
    system: "dnd5e",
    habitat: "Subterrâneo",
    image: "/dark-elf-shadow-fantasy.png",
    description: "Elfo sombrio mestre das artes assassinas e magia negra.",
    stats: { strength: 65, speed: 85, magic: 80, intelligence: 75 },
  },
  {
    id: 110,
    name: "Hobgoblin Capitão",
    type: "Humanoide",
    category: "monsters",
    system: "dnd5e",
    habitat: "Fortalezas Militares",
    image: "/placeholder-6f45t.png",
    description: "Líder militar disciplinado com táticas avançadas de combate.",
    stats: { strength: 80, speed: 65, magic: 25, intelligence: 70 },
  },

  // D&D 5e - Mortos-vivos
  {
    id: 111,
    name: "Zumbi Putrefato",
    type: "Morto-vivo",
    category: "monsters",
    system: "dnd5e",
    habitat: "Cemitérios Amaldiçoados",
    image: "/placeholder-n8pk7.png",
    description: "Cadáver reanimado por magia negra, lento mas implacável.",
    stats: { strength: 70, speed: 20, magic: 0, intelligence: 10 },
  },
  {
    id: 112,
    name: "Esqueleto Guerreiro",
    type: "Morto-vivo",
    category: "monsters",
    system: "dnd5e",
    habitat: "Catacumbas Antigas",
    image: "/placeholder-vk9gc.png",
    description: "Ossos animados de antigo guerreiro, mantém habilidades de combate.",
    stats: { strength: 60, speed: 50, magic: 15, intelligence: 25 },
  },
  {
    id: 113,
    name: "Vampiro Nobre",
    type: "Morto-vivo",
    category: "monsters",
    system: "dnd5e",
    habitat: "Castelos Sombrios",
    image: "/placeholder.svg?height=200&width=300",
    description: "Morto-vivo aristocrático com poderes sobrenaturais e sede de sangue.",
    stats: { strength: 85, speed: 90, magic: 85, intelligence: 90 },
  },
  {
    id: 114,
    name: "Lich Supremo",
    type: "Morto-vivo",
    category: "monsters",
    system: "dnd5e",
    habitat: "Torres Arcanas",
    image: "/supreme-lich-skeleton-mage.png",
    description: "Mago morto-vivo de poder incomensurável, mestre da necromancia.",
    stats: { strength: 40, speed: 60, magic: 100, intelligence: 95 },
  },
  {
    id: 115,
    name: "Fantasma Vingativo",
    type: "Morto-vivo",
    category: "monsters",
    system: "dnd5e",
    habitat: "Locais Assombrados",
    image: "/placeholder.svg?height=200&width=300",
    description: "Espírito atormentado preso ao mundo material por vingança.",
    stats: { strength: 30, speed: 80, magic: 75, intelligence: 65 },
  },

  // D&D 5e - Aberrações
  {
    id: 116,
    name: "Beholder Tirano",
    type: "Aberração",
    category: "monsters",
    system: "dnd5e",
    habitat: "Labirintos Subterrâneos",
    image: "/placeholder.svg?height=200&width=300",
    description: "Esfera flutuante com olho central e tentáculos oculares mágicos.",
    stats: { strength: 50, speed: 40, magic: 95, intelligence: 85 },
  },
  {
    id: 117,
    name: "Mind Flayer",
    type: "Aberração",
    category: "monsters",
    system: "dnd5e",
    habitat: "Cidades Subterrâneas",
    image: "/placeholder.svg?height=200&width=300",
    description: "Aberração psíquica que se alimenta de cérebros e controla mentes.",
    stats: { strength: 55, speed: 60, magic: 90, intelligence: 95 },
  },
  {
    id: 118,
    name: "Gibbering Mouther",
    type: "Aberração",
    category: "monsters",
    system: "dnd5e",
    habitat: "Planos Distorcidos",
    image: "/placeholder.svg?height=200&width=300",
    description: "Massa amorfa coberta de bocas que falam incoerências enlouquecedoras.",
    stats: { strength: 45, speed: 30, magic: 70, intelligence: 20 },
  },

  // D&D 5e - Dragões
  {
    id: 119,
    name: "Dragão Vermelho Ancião",
    type: "Dragão",
    category: "monsters",
    system: "dnd5e",
    habitat: "Vulcões Ativos",
    image: "/ancient-red-dragon.png",
    description: "O mais poderoso dos dragões cromáticos, mestre do fogo e da destruição.",
    stats: { strength: 100, speed: 80, magic: 90, intelligence: 85 },
  },
  {
    id: 120,
    name: "Dragão Azul Adulto",
    type: "Dragão",
    category: "monsters",
    system: "dnd5e",
    habitat: "Desertos Elétricos",
    image: "/placeholder.svg?height=200&width=300",
    description: "Dragão cromático que domina os raios e tempestades do deserto.",
    stats: { strength: 90, speed: 85, magic: 85, intelligence: 80 },
  },
  {
    id: 121,
    name: "Dragão Verde Jovem",
    type: "Dragão",
    category: "monsters",
    system: "dnd5e",
    habitat: "Florestas Venenosas",
    image: "/placeholder.svg?height=200&width=300",
    description: "Dragão astuto que usa veneno e manipulação para dominar territórios.",
    stats: { strength: 80, speed: 75, magic: 80, intelligence: 85 },
  },
  {
    id: 122,
    name: "Dragão Dourado Ancião",
    type: "Dragão",
    category: "monsters",
    system: "dnd5e",
    habitat: "Montanhas Celestiais",
    image: "/placeholder.svg?height=200&width=300",
    description: "O mais nobre dos dragões metálicos, guardião da justiça e sabedoria.",
    stats: { strength: 95, speed: 85, magic: 95, intelligence: 95 },
  },
  {
    id: 123,
    name: "Dragão Prateado Adulto",
    type: "Dragão",
    category: "monsters",
    system: "dnd5e",
    habitat: "Picos Gelados",
    image: "/placeholder.svg?height=200&width=300",
    description: "Dragão metálico benevolente com sopro de gelo e forma humana.",
    stats: { strength: 85, speed: 90, magic: 85, intelligence: 90 },
  },

  // D&D 5e - Gigantes
  {
    id: 124,
    name: "Gigante de Gelo",
    type: "Gigante",
    category: "monsters",
    system: "dnd5e",
    habitat: "Tundras Geladas",
    image: "/placeholder.svg?height=200&width=300",
    description: "Colosso das terras geladas com força brutal e resistência ao frio.",
    stats: { strength: 95, speed: 50, magic: 30, intelligence: 60 },
  },
  {
    id: 125,
    name: "Gigante de Fogo",
    type: "Gigante",
    category: "monsters",
    system: "dnd5e",
    habitat: "Forjas Vulcânicas",
    image: "/placeholder.svg?height=200&width=300",
    description: "Mestre ferreiro gigante que forja armas em lava derretida.",
    stats: { strength: 90, speed: 55, magic: 40, intelligence: 70 },
  },
  {
    id: 126,
    name: "Gigante das Nuvens",
    type: "Gigante",
    category: "monsters",
    system: "dnd5e",
    habitat: "Castelos Flutuantes",
    image: "/placeholder.svg?height=200&width=300",
    description: "Nobre gigante que vive em palácios suspensos nas nuvens.",
    stats: { strength: 85, speed: 60, magic: 70, intelligence: 80 },
  },
  {
    id: 127,
    name: "Gigante das Tempestades",
    type: "Gigante",
    category: "monsters",
    system: "dnd5e",
    habitat: "Mares Tempestuosos",
    image: "/placeholder.svg?height=200&width=300",
    description: "O mais poderoso dos gigantes, senhor dos raios e tempestades.",
    stats: { strength: 100, speed: 70, magic: 85, intelligence: 85 },
  },

  // D&D 5e - Elementais
  {
    id: 128,
    name: "Elemental de Fogo",
    type: "Elemental",
    category: "monsters",
    system: "dnd5e",
    habitat: "Plano Elemental do Fogo",
    image: "/placeholder.svg?height=200&width=300",
    description: "Ser de chamas puras com poder destrutivo e calor intenso.",
    stats: { strength: 70, speed: 80, magic: 85, intelligence: 50 },
  },
  {
    id: 129,
    name: "Elemental de Água",
    type: "Elemental",
    category: "monsters",
    system: "dnd5e",
    habitat: "Plano Elemental da Água",
    image: "/placeholder.svg?height=200&width=300",
    description: "Massa líquida consciente capaz de afogar inimigos e controlar marés.",
    stats: { strength: 75, speed: 70, magic: 80, intelligence: 50 },
  },
  {
    id: 130,
    name: "Elemental de Ar",
    type: "Elemental",
    category: "monsters",
    system: "dnd5e",
    habitat: "Plano Elemental do Ar",
    image: "/placeholder.svg?height=200&width=300",
    description: "Vórtice de ventos poderosos que pode criar furacões devastadores.",
    stats: { strength: 65, speed: 95, magic: 75, intelligence: 50 },
  },
  {
    id: 131,
    name: "Elemental de Terra",
    type: "Elemental",
    category: "monsters",
    system: "dnd5e",
    habitat: "Plano Elemental da Terra",
    image: "/earth-elemental-golem.png",
    description: "Colosso de pedra e terra com força esmagadora e resistência suprema.",
    stats: { strength: 95, speed: 40, magic: 70, intelligence: 50 },
  },

  // D&D 5e - Demônios e Diabos
  {
    id: 132,
    name: "Balor Senhor Demônio",
    type: "Demônio",
    category: "monsters",
    system: "dnd5e",
    habitat: "Abismo Infernal",
    image: "/placeholder.svg?height=200&width=300",
    description: "Senhor demônio com chicote de fogo e aura de chamas mortais.",
    stats: { strength: 95, speed: 75, magic: 90, intelligence: 80 },
  },
  {
    id: 133,
    name: "Pit Fiend Arquidiabo",
    type: "Diabo",
    category: "monsters",
    system: "dnd5e",
    habitat: "Nove Infernos",
    image: "/placeholder.svg?height=200&width=300",
    description: "Arquidiabo com asas membranosas e poder sobre contratos infernais.",
    stats: { strength: 90, speed: 70, magic: 95, intelligence: 90 },
  },
  {
    id: 134,
    name: "Succubus Sedutora",
    type: "Demônio",
    category: "monsters",
    system: "dnd5e",
    habitat: "Planos Inferiores",
    image: "/placeholder.svg?height=200&width=300",
    description: "Demônio sedutor que drena energia vital através de charme e sedução.",
    stats: { strength: 50, speed: 80, magic: 85, intelligence: 85 },
  },

  // Tormenta20 - Raças
  {
    id: 10,
    name: "Humano de Arton",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Reino de Deheon",
    image: "/arton-knight.png",
    description: "Humanos nativos de Arton, conhecidos por sua determinação e versatilidade.",
    stats: { strength: 70, speed: 70, magic: 70, intelligence: 70 },
  },
  {
    id: 11,
    name: "Anão de Doherimm",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Montanhas de Doherimm",
    image: "/placeholder-dohhk.png",
    description: "Anões mestres da forja e da engenharia, guardiões das montanhas sagradas.",
    stats: { strength: 85, speed: 45, magic: 35, intelligence: 75 },
  },
  {
    id: 12,
    name: "Elfo de Lenórienn",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Florestas de Lenórienn",
    image: "/dark-elf-shadow-fantasy.png",
    description: "Elfos guardiões das florestas antigas, com profunda conexão com a natureza.",
    stats: { strength: 55, speed: 80, magic: 85, intelligence: 80 },
  },
  {
    id: 13,
    name: "Goblin das Cavernas",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Cavernas Subterrâneas",
    image: "/placeholder.svg?height=300&width=400",
    description: "Pequenos humanoides astutos, especialistas em mineração e armadilhas.",
    stats: { strength: 40, speed: 85, magic: 50, intelligence: 70 },
  },
  {
    id: 14,
    name: "Lefou Corrompido",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Terras Sombrias",
    image: "/placeholder.svg?height=300&width=400",
    description: "Humanos corrompidos pelo caos, com mutações imprevisíveis e poderes sombrios.",
    stats: { strength: 75, speed: 60, magic: 80, intelligence: 45 },
  },
  {
    id: 15,
    name: "Minotauro Guerreiro",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Labirintos Antigos",
    image: "/placeholder.svg?height=300&width=400",
    description: "Poderosos guerreiros com cabeça de touro, mestres em combate corpo a corpo.",
    stats: { strength: 90, speed: 65, magic: 30, intelligence: 60 },
  },
  {
    id: 16,
    name: "Qareen do Deserto",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Desertos de Zakhar",
    image: "/placeholder.svg?height=300&width=400",
    description: "Descendentes de gênios com poderes elementais e sabedoria ancestral.",
    stats: { strength: 60, speed: 70, magic: 95, intelligence: 85 },
  },
  {
    id: 17,
    name: "Hynne Explorador",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Colinas Verdejantes",
    image: "/placeholder.svg?height=300&width=400",
    description: "Pequenos exploradores corajosos, similares aos halflings mas únicos de Arton.",
    stats: { strength: 45, speed: 85, magic: 55, intelligence: 75 },
  },
  {
    id: 18,
    name: "Kliren Inventor",
    type: "Raça",
    category: "races",
    system: "tormenta20",
    habitat: "Oficinas Tecnológicas",
    image: "/placeholder.svg?height=300&width=400",
    description: "Gnomos inventores especializados em tecnologia e engenhocas mecânicas.",
    stats: { strength: 35, speed: 60, magic: 70, intelligence: 95 },
  },

  // Vampiro: A Máscara - Clãs
  {
    id: 19,
    name: "Brujah Anarquista",
    type: "Clã Vampírico",
    category: "races",
    system: "vampiro",
    habitat: "Ruas da Cidade",
    image: "/placeholder.svg?height=300&width=400",
    description: "Vampiros rebeldes e apaixonados, lutadores natos contra a opressão.",
    stats: { strength: 85, speed: 80, magic: 60, intelligence: 70 },
  },
  {
    id: 20,
    name: "Gangrel Selvagem",
    type: "Clã Vampírico",
    category: "races",
    system: "vampiro",
    habitat: "Florestas e Ermos",
    image: "/placeholder.svg?height=300&width=400",
    description: "Vampiros bestiais com forte conexão com a natureza e formas animais.",
    stats: { strength: 80, speed: 90, magic: 70, intelligence: 60 },
  },
  {
    id: 21,
    name: "Malkaviano Visionário",
    type: "Clã Vampírico",
    category: "races",
    system: "vampiro",
    habitat: "Asilos e Hospitais",
    image: "/placeholder.svg?height=300&width=400",
    description: "Vampiros amaldiçoados com loucura, mas dotados de visões proféticas.",
    stats: { strength: 60, speed: 70, magic: 95, intelligence: 90 },
  },
  {
    id: 22,
    name: "Nosferatu das Sombras",
    type: "Clã Vampírico",
    category: "races",
    system: "vampiro",
    habitat: "Esgotos e Túneis",
    image: "/placeholder.svg?height=300&width=400",
    description: "Vampiros deformados que dominam as redes de informação das cidades.",
    stats: { strength: 70, speed: 85, magic: 75, intelligence: 95 },
  },
  {
    id: 23,
    name: "Toreador Artista",
    type: "Clã Vampírico",
    category: "races",
    system: "vampiro",
    habitat: "Galerias e Teatros",
    image: "/placeholder.svg?height=300&width=400",
    description: "Vampiros obcecados pela beleza e arte, patronos das artes mortais.",
    stats: { strength: 50, speed: 75, magic: 80, intelligence: 85 },
  },
  {
    id: 24,
    name: "Tremere Feiticeiro",
    type: "Clã Vampírico",
    category: "races",
    system: "vampiro",
    habitat: "Capelas Herméticas",
    image: "/placeholder.svg?height=300&width=400",
    description: "Vampiros magos que dominam a taumaturgia e os segredos do sangue.",
    stats: { strength: 60, speed: 65, magic: 100, intelligence: 95 },
  },
  {
    id: 25,
    name: "Ventrue Nobre",
    type: "Clã Vampírico",
    category: "races",
    system: "vampiro",
    habitat: "Mansões e Corporações",
    image: "/placeholder.svg?height=300&width=400",
    description: "Vampiros aristocratas que controlam a política e economia mortal.",
    stats: { strength: 70, speed: 60, magic: 75, intelligence: 90 },
  },

  // Monstros adicionais para cada sistema
  {
    id: 26,
    name: "Dragão Ancião Vermelho",
    type: "Dragão",
    category: "monsters",
    system: "dnd5e",
    habitat: "Montanhas Vulcânicas",
    image: "/ancient-red-dragon.png",
    description: "Uma criatura majestosa e temível, com escamas vermelhas como brasas.",
    stats: { strength: 95, speed: 70, magic: 90, intelligence: 85 },
  },
  {
    id: 27,
    name: "Lich Supremo",
    type: "Morto-Vivo",
    category: "monsters",
    system: "dnd5e",
    habitat: "Ruínas Amaldiçoadas",
    image: "/supreme-lich-skeleton-mage.png",
    description: "Antigo mago que transcendeu a morte, dominando magias necromânticas.",
    stats: { strength: 40, speed: 30, magic: 100, intelligence: 95 },
  },
  {
    id: 28,
    name: "Hidra de Três Cabeças",
    type: "Monstro",
    category: "monsters",
    system: "dnd5e",
    habitat: "Pântanos Tóxicos",
    image: "/three-headed-swamp-hydra.png",
    description: "Criatura reptiliana com múltiplas cabeças que regeneram quando cortadas.",
    stats: { strength: 85, speed: 60, magic: 20, intelligence: 45 },
  },
  {
    id: 29,
    name: "Lobo Sombrio",
    type: "Fera",
    category: "monsters",
    system: "tormenta20",
    habitat: "Florestas Sombrias",
    image: "/shadow-wolf-dark-forest.png",
    description: "Predador noturno com pelagem negra como a noite.",
    stats: { strength: 70, speed: 85, magic: 40, intelligence: 60 },
  },
  {
    id: 30,
    name: "Demônio da Tormenta",
    type: "Demônio",
    category: "monsters",
    system: "tormenta20",
    habitat: "Portal da Tormenta",
    image: "/placeholder.svg?height=300&width=400",
    description: "Ser do caos puro que emerge dos portais da Tormenta para corromper o mundo.",
    stats: { strength: 90, speed: 75, magic: 95, intelligence: 70 },
  },
]

const rpgSystems = [
  { id: "all", name: "Todos os Sistemas" },
  { id: "dnd5e", name: "Dungeons & Dragons (D&D)" },
  { id: "tormenta20", name: "Tormenta20 (T20)" },
  { id: "vampiro", name: "Vampiro: A Máscara" },
]

const categories = [
  { id: "all", name: "Todas as Categorias", icon: BookOpen },
  { id: "monsters", name: "Monstros", icon: Shield },
  { id: "items", name: "Itens", icon: Sword },
  { id: "races", name: "Raças", icon: Users },
  { id: "spells", name: "Magias", icon: Zap },
]

export default function BestiarioDigital() {
  const [creatures, setCreatures] = useState<Creature[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [selectedCreature, setSelectedCreature] = useState<Creature | null>(null);
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSystem, setSelectedSystem] = useState("all")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [showProfile, setShowProfile] = useState(false)
  const [showPdfManager, setShowPdfManager] = useState(false)
  const [showFavorites, setShowFavorites] = useState(false)

  useEffect(() => {
    const storedFavorites = localStorage.getItem("favorites");
    if (storedFavorites) {
      setFavorites(JSON.parse(storedFavorites));
    }
  }, [])

  const toggleFavorite = (creatureId: number) => {
    const newFavorites = favorites.includes(creatureId)
      ? favorites.filter((id) => id !== creatureId)
      : [...favorites, creatureId]

    setFavorites(newFavorites)
    localStorage.setItem("bestiario-favorites", JSON.stringify(newFavorites))
  }

  const handleCharacterSheetUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    const newSheets = Array.from(files).map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toLocaleDateString(),
      file: file,
    }))

    setCharacterSheets((prev) => ({
      ...prev,
      [systemId]: [...prev[systemId], ...newSheets],
    }))
  }

  const handleDownload = (file: File) => {
    const url = URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = url;
    a.download = file.name;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCharacterSheetRemove = (systemId, sheetId) => {
    setCharacterSheets((prev) => ({
      ...prev,
      [systemId]: prev[systemId].filter((sheet) => sheet.id !== sheetId),
    }))
  }

  const filteredCreatures = creatures.filter((creature) => {
    const matchesSearch = creature.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesSystem = selectedSystem === "all" || creature.system === selectedSystem
    const matchesCategory = selectedCategory === "all" || creature.category === selectedCategory
    return matchesSearch && matchesSystem && matchesCategory
  })

  const favoriteCreatures = creatures.filter((creature) => favorites.includes(creature.id))

  const handlePdfUpload = (systemId, event) => {
    const files = Array.from(event.target.files)
    const newPdfs = files.map((file) => ({
      id: Date.now() + Math.random(),
      name: file.name,
      size: file.size,
      uploadDate: new Date().toLocaleDateString(),
      file: file,
    }))

    setSystemPdfs((prev) => ({
      ...prev,
      [systemId]: [...prev[systemId], ...newPdfs],
    }))
  }

  const handlePdfDownload = (pdf) => {
    if (pdf.file) {
      const url = URL.createObjectURL(pdf.file)
      const a = document.createElement("a")
      a.href = url
      a.download = pdf.name
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }
  }

  const handlePdfRemove = (systemId, pdfId) => {
    setSystemPdfs((prev) => ({
      ...prev,
      [systemId]: prev[systemId].filter((pdf) => pdf.id !== pdfId),
    }))
  }

  if (showFavorites) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary">
                Bestiário Digital - Favoritos
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowFavorites(false)}>
                Voltar ao Catálogo
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="mb-6">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary mb-2">
              Seus Favoritos
            </h2>
            <p className="text-muted-foreground">
              {favoriteCreatures.length} {favoriteCreatures.length === 1 ? "item favoritado" : "itens favoritados"}
            </p>
          </div>

          {favoriteCreatures.length === 0 ? (
            <div className="text-center py-12">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">Nenhum favorito ainda.</p>
              <p className="text-muted-foreground text-sm mt-2">
                Clique no coração dos cards para adicionar aos favoritos.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favoriteCreatures.map((creature) => (
                <Card
                  key={creature.id}
                  className="overflow-hidden creature-card cursor-pointer group"
                  onClick={() => setSelectedCreature(creature)}
                >
                  <div className="relative">
                    <img
                      src={creature.image || "/placeholder.svg"}
                      alt={creature.name}
                      className="w-full h-48 object-cover card-image"
                    />
                    <div className="absolute top-2 left-2">
                      <Badge variant="outline" className="bg-background/80">
                        {rpgSystems.find((s) => s.id === creature.system)?.name}
                      </Badge>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(creature.id)
                      }}
                      className="absolute bottom-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                    >
                      <Heart className="h-4 w-4 text-red-500" fill="currentColor" />
                    </button>
                  </div>
                  <CardHeader>
                    <CardTitle className="font-[family-name:var(--font-cinzel)] grimoire-text group-hover:text-accent transition-colors">
                      {creature.name}
                    </CardTitle>
                    <CardDescription>
                      <Badge variant="outline" className="mb-2">
                        {creature.type}
                      </Badge>
                      <p className="text-sm">{creature.habitat}</p>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{creature.description}</p>
                    <Button
                      size="sm"
                      className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                    >
                      Ver Detalhes
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }

  if (showPdfManager) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary">
                Bestiário Digital - Gerenciar Documentos
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowPdfManager(false)}>
                Voltar ao Catálogo
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid gap-8">
            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary mb-6">
                Livros de Regras
              </h2>
              <div className="grid gap-6">
                {rpgSystems
                  .filter((system) => system.id !== "all")
                  .map((system) => (
                    <Card key={system.id} className="parchment-bg">
                      <CardHeader>
                        <CardTitle className="font-[family-name:var(--font-cinzel)] grimoire-text flex items-center gap-2">
                          <BookOpen className="h-5 w-5" />
                          {system.name} - Livros de Regras
                        </CardTitle>
                        <CardDescription>Gerencie os PDFs de regras do sistema {system.name}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="file"
                              multiple
                              accept=".pdf"
                              onChange={(e) => handlePdfUpload(system.id, e)}
                              className="hidden"
                            />
                            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                              <Upload className="h-4 w-4" />
                              Adicionar Livros
                            </Button>
                          </label>
                        </div>

                        {systemPdfs[system.id].length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Livros Carregados:</h4>
                            {systemPdfs[system.id].map((pdf) => (
                              <div
                                key={pdf.id}
                                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border"
                              >
                                <div className="flex items-center gap-3">
                                  <BookOpen className="h-4 w-4 text-red-500" />
                                  <div>
                                    <p className="font-medium text-sm">{pdf.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {(pdf.size / 1024 / 1024).toFixed(2)} MB • {pdf.uploadDate}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handlePdfDownload(pdf)}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handlePdfRemove(system.id, pdf.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    ×
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary mb-6">
                Fichas de Personagem
              </h2>
              <div className="grid gap-6">
                {rpgSystems
                  .filter((system) => system.id !== "all")
                  .map((system) => (
                    <Card key={`sheets-${system.id}`} className="parchment-bg">
                      <CardHeader>
                        <CardTitle className="font-[family-name:var(--font-cinzel)] grimoire-text flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          {system.name} - Fichas de Personagem
                        </CardTitle>
                        <CardDescription>Gerencie as fichas de personagem do sistema {system.name}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center gap-4">
                          <label className="flex items-center gap-2 cursor-pointer">
                            <input
                              type="file"
                              multiple
                              accept=".pdf"
                              onChange={(e) => handleCharacterSheetUpload(e)}
                              className="hidden"
                            />
                            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                              <Upload className="h-4 w-4" />
                              Adicionar Fichas
                            </Button>
                          </label>
                        </div>

                        {characterSheets[system.id].length > 0 && (
                          <div className="space-y-2">
                            <h4 className="font-semibold text-sm">Fichas Carregadas:</h4>
                            {characterSheets[system.id].map((sheet) => (
                              <div
                                key={sheet.id}
                                className="flex items-center justify-between p-3 bg-muted/20 rounded-lg border"
                              >
                                <div className="flex items-center gap-3">
                                  <Users className="h-4 w-4 text-red-500" />
                                  <div>
                                    <p className="font-medium text-sm">{sheet.name}</p>
                                    <p className="text-xs text-muted-foreground">
                                      {(sheet.size / 1024 / 1024).toFixed(2)} MB • {sheet.uploadDate}
                                    </p>
                                  </div>
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button variant="ghost" size="sm" onClick={() => handleCharacterSheetDownload(sheet)}>
                                    <Download className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleCharacterSheetRemove(system.id, sheet.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    ×
                                  </Button>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (showProfile) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary">
                Bestiário Digital
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setShowProfile(false)}>
                Voltar ao Catálogo
              </Button>
              <Button variant="ghost" size="sm">
                <LogOut className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <Card className="max-w-2xl mx-auto parchment-bg">
            <CardHeader className="text-center">
              <div className="w-24 h-24 bg-muted rounded-full mx-auto mb-4 flex items-center justify-center">
                <User className="h-12 w-12 text-muted-foreground" />
              </div>
              <CardTitle className="font-[family-name:var(--font-cinzel)] grimoire-text text-2xl">
                Mestre dos Bestiários
              </CardTitle>
              <CardDescription>Explorador de criaturas místicas</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h3 className="font-semibold mb-2">Informações Pessoais</h3>
                <div className="space-y-2">
                  <Input placeholder="Nome de usuário" defaultValue="mestre.bestiario" />
                  <Input placeholder="Email" defaultValue="mestre@bestiario.com" type="email" />
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2 flex items-center gap-2">
                  Criaturas Favoritas
                  <Badge variant="secondary">{favorites.length}</Badge>
                </h3>
                <div className="grid gap-2">
                  {favoriteCreatures.slice(0, 3).map((creature) => (
                    <div key={creature.id} className="flex items-center gap-3 p-2 rounded-lg bg-muted/50">
                      <img
                        src={creature.image || "/placeholder.svg"}
                        alt={creature.name}
                        className="w-12 h-12 rounded object-cover"
                      />
                      <div>
                        <p className="font-medium">{creature.name}</p>
                        <p className="text-sm text-muted-foreground">{creature.type}</p>
                      </div>
                      <Heart className="h-4 w-4 text-red-500 ml-auto" fill="currentColor" />
                    </div>
                  ))}
                  {favorites.length > 3 && (
                    <Button variant="ghost" size="sm" onClick={() => setShowFavorites(true)}>
                      Ver todos os {favorites.length} favoritos
                    </Button>
                  )}
                </div>
              </div>
              <Button className="w-full">Salvar Alterações</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  if (selectedCreature) {
    return (
      <div className="min-h-screen bg-background">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary">
                Bestiário Digital
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" onClick={() => setSelectedCreature(null)}>
                Voltar ao Catálogo
              </Button>
              <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)}>
                <User className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={selectedCreature.image || "/placeholder.svg"}
                  alt={selectedCreature.name}
                  className="w-full h-96 object-cover rounded-lg shadow-lg card-image"
                />
                <button
                  onClick={() => toggleFavorite(selectedCreature.id)}
                  className="absolute top-4 right-4 p-3 bg-background/80 rounded-full hover:bg-background transition-colors"
                >
                  <Heart
                    className={`h-6 w-6 ${favorites.includes(selectedCreature.id) ? "text-red-500" : "text-muted-foreground"}`}
                    fill={favorites.includes(selectedCreature.id) ? "currentColor" : "none"}
                  />
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <div>
                <h1 className="text-4xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary mb-2">
                  {selectedCreature.name}
                </h1>
                <div className="flex gap-2 mb-4">
                  <Badge variant="secondary">{selectedCreature.type}</Badge>
                  <Badge variant="outline">{rpgSystems.find((s) => s.id === selectedCreature.system)?.name}</Badge>
                  {favorites.includes(selectedCreature.id) && (
                    <Badge className="bg-red-900 text-red-300 border-red-700">
                      <Heart className="h-3 w-3 mr-1" fill="currentColor" />
                      Favorito
                    </Badge>
                  )}
                </div>
                <p className="text-muted-foreground mb-4">
                  <strong>Habitat:</strong> {selectedCreature.habitat}
                </p>
                <p className="text-lg leading-relaxed">{selectedCreature.description}</p>
              </div>

              <Button size="lg" className="w-full" onClick={() => setSelectedCreature(null)}>
                Voltar ao Catálogo
              </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary">
              Bestiário Digital
            </h1>
            <select
              value={selectedSystem}
              onChange={(e) => setSelectedSystem(e.target.value)}
              className="px-3 py-1 rounded-md border bg-background text-foreground text-sm border-border"
            >
              {rpgSystems.map((system) => (
                <option key={system.id} value={system.id}>
                  {system.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar no bestiário..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={() => setShowFavorites(true)} className="relative">
              <Heart className="h-4 w-4" />
              {favorites.length > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 text-xs bg-red-600 text-white">
                  {favorites.length}
                </Badge>
              )}
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowPdfManager(true)}>
              <FileText className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => setShowProfile(true)}>
              <User className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="w-64 border-r bg-sidebar min-h-[calc(100vh-4rem)] p-4">
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold font-[family-name:var(--font-cinzel)] text-sidebar-foreground mb-3 flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Categorias
              </h3>
              <div className="space-y-2">
                {categories.map((category) => {
                  const IconComponent = category.icon
                  return (
                    <button
                      key={category.id}
                      onClick={() => setSelectedCategory(category.id)}
                      className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors ${
                        selectedCategory === category.id
                          ? "bg-sidebar-accent text-sidebar-accent-foreground"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50"
                      }`}
                    >
                      <IconComponent className="h-4 w-4" />
                      {category.name}
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <h3 className="font-semibold font-[family-name:var(--font-cinzel)] text-sidebar-foreground mb-3">
                Sistema Atual
              </h3>
              <div className="p-3 rounded-lg bg-sidebar-accent/20 border border-sidebar-border">
                <p className="text-sm font-medium text-sidebar-foreground">
                  {rpgSystems.find((s) => s.id === selectedSystem)?.name}
                </p>
                <p className="text-xs text-sidebar-foreground/70 mt-1">
                  {filteredCreatures.length} {filteredCreatures.length === 1 ? "item encontrado" : "itens encontrados"}
                </p>
              </div>
            </div>

            {favorites.length > 0 && (
              <div>
                <h3 className="font-semibold font-[family-name:var(--font-cinzel)] text-sidebar-foreground mb-3 flex items-center gap-2">
                  <Heart className="h-4 w-4" />
                  Favoritos
                </h3>
                <div className="p-3 rounded-lg bg-sidebar-accent/20 border border-sidebar-border">
                  <p className="text-sm font-medium text-sidebar-foreground">
                    {favorites.length} {favorites.length === 1 ? "favorito" : "favoritos"}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full mt-2 text-xs"
                    onClick={() => setShowFavorites(true)}
                  >
                    Ver Favoritos
                  </Button>
                </div>
              </div>
            )}
          </div>
        </aside>

        <main className="flex-1 p-6">
          <div className="mb-6">
            <h2 className="text-3xl font-bold font-[family-name:var(--font-cinzel)] grimoire-text text-primary mb-2">
              {categories.find((c) => c.id === selectedCategory)?.name || "Catálogo Completo"}
            </h2>
            <p className="text-muted-foreground">
              Explore {categories.find((c) => c.id === selectedCategory)?.name.toLowerCase()} do sistema{" "}
              {rpgSystems.find((s) => s.id === selectedSystem)?.name}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCreatures.map((creature) => (
              <Card
                key={creature.id}
                className="overflow-hidden creature-card cursor-pointer group"
                onClick={() => setSelectedCreature(creature)}
              >
                <div className="relative">
                  <img
                    src={creature.image || "/placeholder.svg"}
                    alt={creature.name}
                    className="w-full h-48 object-cover card-image"
                  />
                  <div className="absolute top-2 left-2">
                    <Badge variant="outline" className="bg-background/80">
                      {rpgSystems.find((s) => s.id === creature.system)?.name}
                    </Badge>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(creature.id)
                    }}
                    className="absolute bottom-2 right-2 p-2 bg-background/80 rounded-full hover:bg-background transition-colors"
                  >
                    <Heart
                      className={`h-4 w-4 ${favorites.includes(creature.id) ? "text-red-500" : "text-muted-foreground"}`}
                      fill={favorites.includes(creature.id) ? "currentColor" : "none"}
                    />
                  </button>
                </div>
                <CardHeader>
                  <CardTitle className="font-[family-name:var(--font-cinzel)] grimoire-text group-hover:text-accent transition-colors">
                    {creature.name}
                  </CardTitle>
                  <CardDescription>
                    <Badge variant="outline" className="mb-2">
                      {creature.type}
                    </Badge>
                    <p className="text-sm">{creature.habitat}</p>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-3 mb-4">{creature.description}</p>
                  <Button
                    size="sm"
                    className="w-full group-hover:bg-accent group-hover:text-accent-foreground transition-colors"
                  >
                    Ver Detalhes
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredCreatures.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg">Nenhum item encontrado com os filtros selecionados.</p>
              <p className="text-muted-foreground text-sm mt-2">Tente alterar o sistema ou categoria selecionada.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
