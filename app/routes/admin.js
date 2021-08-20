const dbConnection = require('./../../config/dbConnection')

module.exports = function (app) {
  app.get('/formulario_inclusao', function (req, res) {
    // encaminha a variavel de sessão recuperada no corpo da requisição
    res.render('admin/form_add_noticia', { autorizado: req.session.autorizado })
  })
  // rota sair da sessão
  app.get('/sair', function (req, res) {
    req.session.destroy(function (erro) {
      res.redirect('/')
    })
  })

  app.post('/noticias/salvar', function (req, res) {
    // é configurar o express para receber o método POST
    // e para isso vamos inserir um parametro no arquivo server.js
    var { titulo, noticia } = req.body
    // console.log(`Titulo: ${titulo} e Notícia: ${noticia}`)
    var connection = dbConnection()

    if (req.session.autorizado == true) {
      connection.query(
        'insert into noticias(titulo, noticia) values ($1, $2)',
        [titulo, noticia],
        function (error, result) {
          // para remover as informações do corpo da página vindos do método POST
          // utilizamos o redirect
          res.redirect('/')
        }
      )
    }
  })

  // Aqui é possível fazer a recuperação das informações de usuário e senha em uma tabela no banco de dados, mas para simplificar iremos utilizar valores constantes
  app.post('/autenticar', function (req, res) {
    // recuperar o usuário e senha pelo post
    var { usuario, senha } = req.body
    //res.send(req.body)
    if (usuario == 'root' && senha == '1234') {
      // com a validação do usuário e senha feito iremos criar a nossa sessão com o express-session
      // criando variavel de sessão autorizado
      req.session.autorizado = true
      res.redirect('/formulario_inclusao')
    } else {
      // redirecionamos para a página home
      // aqui é possível passar a informação de usuário ou senha inválida
      res.redirect('/')
    }
  })
}
