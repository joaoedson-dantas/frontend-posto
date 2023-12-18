# Frontend Posto ABDC

Esse é o frontend do projeto FullStack com Spring boot. Controle de Abastecimentos foi desenvolvido em Angular, seguindo o conceito de Single Page Application (SPA). Esta parte da aplicação oferece uma interface amigável e responsiva para gerenciar abastecimentos em um posto de combustíveis. Foi utilizado JWT token para autenticar as rotas assim como RxJS para fazer as requisições http;

###Link para o [banckend](https://github.com/joaoedson-dantas/api-posto-abcd)

![image](https://github.com/joaoedson-dantas/frontend-posto/assets/114243172/fdde6a8f-cf10-4885-86e9-d4e04cf6a785)

### Funcionalidades Destacadas:

- **Autenticação Segura:**
  - Utilização de telas de login e cadastro para autenticação de usuários.
  - Armazenamento seguro do JWT Token nos cookies do navegador.

- **Controle de Acesso:**
  - Implementação de controle de acesso, garantindo que apenas usuários autenticados possam interagir com a aplicação.

- **Telas Responsivas:**
  - Desenvolvimento de telas responsivas para garantir uma experiência consistente em diferentes dispositivos.

- **Lazy Loading:**
  - Aplicação do conceito de Lazy Loading para otimizar o carregamento de módulos e melhorar o desempenho geral.
 
 ### Tecnologias Utilizadas:

- **Angular:**
  - Framework robusto para a construção de interfaces web modernas.

- **RxJS:**
  - Biblioteca para programação reativa, utilizada para realizar requisições HTTP e manipular dados de forma eficiente.
    
- **PrimeNG:**
  - Biblioteca para criação de componetes e estilização

## Antes de começar, certifique-se de ter o seguinte instalado:

- [Node.js](https://nodejs.org/): Plataforma para execução de JavaScript no servidor.
- [Angular CLI](https://cli.angular.io/): Interface de linha de comando para o Angular.

### Configuração

1. No diretório do projeto frontend, execute o seguinte comando para instalar as dependências:

   ```bash
   npm install
   ```
## Configuração do JWT Token
Abra o arquivo de configuração (por exemplo, src/environments/environment.ts).
Configure a URL do backend e outras informações necessárias.

Após instalado as dependencias, certifique-se que o seu backend está rodando e execute um: 
```bash
   npm start
   ```
