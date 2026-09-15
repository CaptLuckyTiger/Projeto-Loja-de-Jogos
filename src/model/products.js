export const products = [
  { id: 'mario', name: 'Super Mario Bros Deluxe Switch', price: 150, studio: 'Nintendo', genre: 'Plataforma', image: 'assets/mario.jpg', description: 'Ajude Mario a resgatar a princesa Peach em uma aventura clássica e colorida.' },
  { id: 'dying-light', name: 'Dying Light', price: 89.99, studio: 'Techland', genre: 'Ação, sobrevivência, mundo aberto', image: 'assets/dynglight.jpg', description: 'Sobreviva a uma cidade tomada por zumbis e explore cada canto em busca de recursos.' },
  { id: 'mortal-kombat', name: 'Mortal Kombat 11', price: 95, studio: 'NetherRealm Studios', genre: 'Luta', image: 'assets/mortalkombat.jpg', description: 'Combates intensos, personagens icônicos e uma jogabilidade brutal.' },
  { id: 'jumanji', name: 'Jumanji', price: 65, studio: 'Outright Games', genre: 'Ação e aventura', image: 'assets/jumanji.jpg', description: 'Entre em uma aventura divertida e sobreviva ao desafio de Jumanji.' },
  { id: 'avatar', name: 'Avatar: The Game', price: 45.99, studio: 'Ubisoft Montreal', genre: 'Ação e aventura', image: 'assets/avatar.jpg', description: 'Explore Pandora e participe do programa Avatar em uma aventura cinematográfica.' },
  { id: 'valhalla', name: "Assassin's Creed Valhalla", price: 320.99, studio: 'Ubisoft Montreal', genre: 'Ação e aventura', image: 'assets/valhalla.jpg', description: 'Torne-se Eivor, um lendário invasor Viking em busca de glória.' },
  { id: 'watchdogs', name: 'Watch Dogs Legion', price: 220, studio: 'Ubisoft Toronto', genre: 'Ação e aventura em terceira pessoa', image: 'assets/watchdogs.jpg', description: 'Recrute qualquer pessoa da cidade e enfrente uma corporação corrupta em Londres.' },
  { id: 'madagascar', name: 'Madagascar', price: 120, studio: 'Toys for Bob', genre: 'Aventura', image: 'assets/madagascar.jpg', description: 'Ajude os personagens do filme a escaparem do zoológico e voltarem para casa.' },
  { id: 'miles', name: 'Spider-Man Miles Morales', price: 175, studio: 'Insomniac Games', genre: 'Ação e aventura', image: 'assets/miles.jpeg', description: 'Balance por uma Manhattan coberta de neve como o novo Spider-Man.' },
  { id: 'dead-island', name: 'Dead Island 2', price: 350, studio: 'Dambuster Studios', genre: 'RPG e ação', image: 'assets/dead.jpg', description: 'Explore uma Los Angeles mítica, vibrante e coberta de sangue.' },
  { id: 'horizon', name: 'Horizon Zero Dawn', price: 160, studio: 'Guerrilla Games', genre: 'RPG de ação', image: 'assets/horizon.jpeg', description: 'Descubra um futuro pós-apocalíptico dominado por criaturas robóticas.' },
  { id: 'guardians', name: 'Guardiões da Galáxia', price: 280, studio: 'Eidos Montréal', genre: 'Ação e aventura', image: 'assets/guardians.jpg', description: 'Lidere os Guardiões em uma missão para salvar a galáxia.' },
];

export const featuredProducts = ['watchdogs', 'dead-island', 'valhalla'].map((id) => products.find((product) => product.id === id));
