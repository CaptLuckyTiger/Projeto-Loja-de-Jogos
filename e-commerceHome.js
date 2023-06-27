  // Código JavaScript
  $(document).ready(function () {
    // Exibir overlay de login ao clicar no botão "Login"
    $('#login-btn').click(function () {
        $('.login-overlay').fadeIn();
    });

    // Ocultar overlay de login ao clicar no botão "Cancelar"
    $('#login-cancel').click(function () {
        $('.login-overlay').fadeOut();
    });

    // Exibir overlay de cadastro ao clicar no link "Cadastre-se"
    $('#cadastro-link').click(function () {
        $('.login-overlay').fadeOut(function () {
            $('.cadastro-overlay').fadeIn();
        });
    });

    // Ocultar overlay de cadastro ao clicar no link "Login"
    $('#login-link').click(function () {
        $('.cadastro-overlay').fadeOut(function () {
            $('.login-overlay').fadeIn();
        });
    });

    // Verificar se o usuário está logado e exibir o botão "Logout"
    if (localStorage.getItem('nomeUsuario')) {
        $('#logout-btn').show();
    }

    // Ocultar overlay de cadastro ao clicar no botão "Cancelar"
    $('#cadastro-cancel').click(function () {
        $('.cadastro-overlay').fadeOut();
    });

    // Função para processar o cadastro
    $('#cadastro-submit').click(function () {
        var cepRegex = /^[0-9]+$/;
        var nome = $('#cadastro-nome').val();
        var email = $('#cadastro-email').val();
        var cpf = $('#cadastro-cpf').val();
        var cep = $('#cadastro-cep').val();
        var rua = $('#cadastro-rua').val();
        var bairro = $('#cadastro-bairro').val();
        var cidade = $('#cadastro-cidade').val();
        var uf = $('#cadastro-uf').val();
        var numero = $('#cadastro-numero').val();
        var dataNascimento = $('#cadastro-data-nascimento').val();
        var senha = $('#cadastro-senha').val();




        // Validar se os campos obrigatórios não estão vazios
        if (nome.trim() === '' || email.trim() === '' || cpf.trim() === '' || cep.trim() === '' || rua.trim() === '' || bairro.trim() === '' || cidade.trim() === '' || uf.trim() === '' || numero.trim() === '' || dataNascimento.trim() === '' || senha.trim() === '') {
            exibirAlerta('Por favor, preencha todos os campos obrigatórios.');
            return;
        }

        // Validar se o e-mail está no formato correto
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            exibirAlerta('Por favor, insira um e-mail válido.');
            return;
        }

        // Validar se o CPF possui somente números e é válido
        var cpfRegex = /^[0-9]+$/;
        if (!cpfRegex.test(cpf)) {
            exibirAlerta('Por favor, insira um CPF válido.');
            return;
        }
        if (!validarCPF(cpf)) {
            exibirAlerta('Por favor, insira um CPF válido.');
            return;
        }

        // Validar se o CEP possui somente números
        if (!cepRegex.test(cep)) {
            exibirAlerta('Por favor, insira um CEP válido.');
            return;
        }



        // Validar se a data de nascimento é válida e se a pessoa possui 18 anos ou mais
        var dataNascimentoRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dataNascimentoRegex.test(dataNascimento)) {
            exibirAlerta('Por favor, insira uma data de nascimento válida.');
            return;
        }
        var dataNascimentoObj = new Date(dataNascimento);
        var dataAtual = new Date();
        var idade = dataAtual.getFullYear() - dataNascimentoObj.getFullYear();
        var mes = dataAtual.getMonth() - dataNascimentoObj.getMonth();
        if (mes < 0 || (mes === 0 && dataAtual.getDate() < dataNascimentoObj.getDate())) {
            idade--;
        }
        if (idade < 18) {
            exibirAlerta('É necessário ter 18 anos ou mais para se cadastrar.');
            return;
        }

        // Validar se a senha possui pelo menos 8 dígitos
        if (senha.length < 8) {
            exibirAlerta('A senha deve ter no mínimo 8 caracteres.');
            return false;
        }


        // Se todas as validações passarem, exibir uma mensagem de sucesso
        exibirAlerta('Cadastro realizado com sucesso!');

        // Se todas as validações passaram, exibir os dados
        console.log('Nome: ' + nome);
        console.log('E-mail: ' + email);
        console.log('CPF: ' + cpf);
        console.log('CEP: ' + cep);
        console.log('Rua: ' + rua);
        console.log('Bairro: ' + bairro);
        console.log('Cidade: ' + cidade);
        console.log('UF: ' + uf);
        console.log('Número: ' + numero);
        console.log('Data de Nascimento: ' + dataNascimento);
        console.log('Senha: ' + senha);

        console.log('O formulario foi submetido'); // teste

        // Limpar os campos do formulário
        $('input[type="text"], input[type="email"], input[type="password"], input[type="date"]').val('');

    });

    // Função para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        // Elimina CPFs inválidos conhecidos
        if (
            cpf.length !== 11 ||
            cpf === '00000000000' ||
            cpf === '11111111111' ||
            cpf === '22222222222' ||
            cpf === '33333333333' ||
            cpf === '44444444444' ||
            cpf === '55555555555' ||
            cpf === '66666666666' ||
            cpf === '77777777777' ||
            cpf === '88888888888' ||
            cpf === '99999999999'
        ) {
            return false;
        }
        // Valida 1º dígito
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) return false;
        // Valida 2º dígito
        add = 0;
        for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
        rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(10))) return false;
        return true;
    }
});

$(document).ready(function () {
    $('.carousel').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        autoplay: true,
        autoplaySpeed: 2000,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear'


    });
});


// Função para avançar para o próximo slide
function nextSlide() {
    $('.carousel').slick('slickNext');
}

// Função para voltar para o slide anterior
function prevSlide() {
    $('.carousel').slick('slickPrev');
}

// Atribua as funções aos eventos de clique dos botões
$('.carousel-button.next').click(nextSlide);
$('.carousel-button.prev').click(prevSlide);

$(document).ready(function () {
    // Ocultar botões originais do Slick Carousel
    $('.slick-prev, .slick-next').hide();

    // Vincular eventos aos botões de navegação personalizados
    $('.carousel-button.prev').click(function () {
        $('.slick-slider').slick('slickPrev');
    });

    $('.carousel-button.next').click(function () {
        $('.slick-slider').slick('slickNext');
    });




});



window.addEventListener('DOMContentLoaded', function () {
    var footer = document.querySelector('.footer');
    var windowHeight = window.innerHeight;
    var bodyHeight = document.body.clientHeight;

    if (windowHeight > bodyHeight) {
        footer.classList.add('sticky-footer');
    } else {
        footer.classList.remove('sticky-footer');
    }
});

window.addEventListener('resize', function () {
    var footer = document.querySelector('.footer');
    var windowHeight = window.innerHeight;
    var bodyHeight = document.body.clientHeight;

    if (windowHeight > bodyHeight) {
        footer.classList.add('sticky-footer');
    } else {
        footer.classList.remove('sticky-footer');
    }
});

function redirecionar() {
    window.location.href = 'e-commercePaginaProdutos.html';
}

$(document).ready(function () {
    // ...

    // Redirecionar para a URL especificada no atributo data-url ao clicar na imagem do carrossel
    $('#banner-carousel img').click(function () {
        var url = $(this).data('url');
        window.location.href = url;
    });

    // ...
});

$(document).ready(function () {
    $('#cadastro-cpf').on('input', function () {
        var cpf = $(this).val();
        var cpfRegex = /^\d{11}$/;

        if (!cpfRegex.test(cpf)) {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });

    $('#cadastro-cep').on('input', function () {
        var cep = $(this).val();
        var cepRegex = /^\d{8}$/;

        if (!cepRegex.test(cep)) {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });


    $('#cadastro-numero').on('input', function () {
        var numero = $(this).val();
        var numeroRegex = /^[0-9]{1,}$/;

        if (!numeroRegex.test(numero)) {
            $(this).addClass('invalid');
        } else {
            $(this).removeClass('invalid');
        }
    });


});

function exibirAlerta(mensagem) {
    $('#alert-message').text(mensagem);
    $('.alert-overlay').fadeIn();
}

// Ocultar overlay do alerta ao clicar no botão "Fechar"
$('.alert-overlay .close-btn').click(function () {
    $('.alert-overlay').fadeOut();
});



//TESTE DE LOGIN////////////////////

// Variável para armazenar o nome do usuário logado
var nomeUsuario = localStorage.getItem("nomeUsuario");

// Função para verificar o login
function verificarLogin() {
    var usuario = document.getElementById("login-usuario").value;
    var senha = document.getElementById("login-senha").value;

    // Verificar as credenciais (exemplo simples)
    if (usuario === "admin" && senha === "senha123") {
        // Login bem-sucedido
        document.getElementById("login-usuario").value = ""; // Limpar o campo de usuário
        document.getElementById("login-senha").value = ""; // Limpar o campo de senha

        // Fechar o evento de login
        $('.login-overlay').fadeOut();

        // Salvar o nome de usuário no localStorage
        localStorage.setItem("nomeUsuario", usuario);

        // Atualizar o valor da variável nomeUsuario
        nomeUsuario = usuario;

        // Exibir o nome do usuário no botão de login
        document.getElementById("login-btn").innerText = nomeUsuario;


    } else {
        // Exibir mensagem de erro de login
        exibirAlerta("Credenciais inválidas");
    }

    // Exibir o botão de logout
    $('#logout-btn').show();

}
// Função para exibir um alerta na tela
function exibirAlerta(mensagem) {
    document.getElementById("alert-message").innerText = mensagem;
    $('.alert-overlay').fadeIn();

    // Fechar o alerta ao clicar no botão "Fechar"
    $('.close-btn').click(function () {
        $('.alert-overlay').fadeOut();
    });
}

// Exibir overlay de login ao clicar no botão "Entrar"
$('#login-btn').click(function () {
    $('.login-overlay').fadeIn();
});

// Ocultar overlay de login ao clicar no botão "Cancelar"
$('#login-cancel').click(function () {
    $('.login-overlay').fadeOut();
});

// Verificar o login ao clicar no botão "Entrar" na tela de login
$('#login-submit').click(function () {
    verificarLogin();
});

// Verificar o login ao pressionar Enter no campo de senha na tela de login
$('#login-senha').keypress(function (e) {
    if (e.which === 13) {
        verificarLogin();
    }
});

// Verificar se há um nome de usuário armazenado e exibir no botão de login
if (nomeUsuario) {
    document.getElementById("login-btn").innerText = nomeUsuario;
}

// Função para fazer logout e apagar as informações do localStorage

function fazerLogout() {
    // Remover o nome de usuário do localStorage
    localStorage.removeItem("nomeUsuario");

    // Atualizar o valor da variável nomeUsuario
    nomeUsuario = null;

    // Atualizar o texto do botão de login
    document.getElementById("login-btn").innerText = "Entrar";

    // Ocultar o botão de logout
    $('#logout-btn').hide();

    //  exibir o botão de logout
    document.getElementById("logout-btn").classList.add("show");
}

$(document).ready(function () {
    // Adicionar evento de clique ao botão de logout
    $('#logout-btn').click(function () {
        fazerLogout();
    });

    // Limpar informações e ocultar o botão "Logout" ao clicar nele
    $('#logout-btn').click(function () {
        // Limpar informações aqui
        // Exemplo: Limpar informações do usuário atual

        // Ocultar o botão "Logout"
        $(this).hide();
    });
});
