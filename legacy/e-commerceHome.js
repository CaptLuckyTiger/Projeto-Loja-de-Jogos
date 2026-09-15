  // CÃ³digo JavaScript
  $(document).ready(function () {
    // Exibir overlay de login ao clicar no botÃ£o "Login"
    $('#login-btn').click(function () {
        $('.login-overlay').fadeIn();
    });

    // Ocultar overlay de login ao clicar no botÃ£o "Cancelar"
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

    // Verificar se o usuÃ¡rio estÃ¡ logado e exibir o botÃ£o "Logout"
    if (localStorage.getItem('nomeUsuario')) {
        $('#logout-btn').show();
    }

    // Ocultar overlay de cadastro ao clicar no botÃ£o "Cancelar"
    $('#cadastro-cancel').click(function () {
        $('.cadastro-overlay').fadeOut();
    });

    // FunÃ§Ã£o para processar o cadastro
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




        // Validar se os campos obrigatÃ³rios nÃ£o estÃ£o vazios
        if (nome.trim() === '' || email.trim() === '' || cpf.trim() === '' || cep.trim() === '' || rua.trim() === '' || bairro.trim() === '' || cidade.trim() === '' || uf.trim() === '' || numero.trim() === '' || dataNascimento.trim() === '' || senha.trim() === '') {
            exibirAlerta('Por favor, preencha todos os campos obrigatÃ³rios.');
            return;
        }

        // Validar se o e-mail estÃ¡ no formato correto
        var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            exibirAlerta('Por favor, insira um e-mail vÃ¡lido.');
            return;
        }

        // Validar se o CPF possui somente nÃºmeros e Ã© vÃ¡lido
        var cpfRegex = /^[0-9]+$/;
        if (!cpfRegex.test(cpf)) {
            exibirAlerta('Por favor, insira um CPF vÃ¡lido.');
            return;
        }
        if (!validarCPF(cpf)) {
            exibirAlerta('Por favor, insira um CPF vÃ¡lido.');
            return;
        }

        // Validar se o CEP possui somente nÃºmeros
        if (!cepRegex.test(cep)) {
            exibirAlerta('Por favor, insira um CEP vÃ¡lido.');
            return;
        }



        // Validar se a data de nascimento Ã© vÃ¡lida e se a pessoa possui 18 anos ou mais
        var dataNascimentoRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dataNascimentoRegex.test(dataNascimento)) {
            exibirAlerta('Por favor, insira uma data de nascimento vÃ¡lida.');
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
            exibirAlerta('Ã‰ necessÃ¡rio ter 18 anos ou mais para se cadastrar.');
            return;
        }

        // Validar se a senha possui pelo menos 8 dÃ­gitos
        if (senha.length < 8) {
            exibirAlerta('A senha deve ter no mÃ­nimo 8 caracteres.');
            return false;
        }


        // Se todas as validaÃ§Ãµes passarem, exibir uma mensagem de sucesso
        exibirAlerta('Cadastro realizado com sucesso!');

        // Se todas as validaÃ§Ãµes passaram, exibir os dados
        console.log('Nome: ' + nome);
        console.log('E-mail: ' + email);
        console.log('CPF: ' + cpf);
        console.log('CEP: ' + cep);
        console.log('Rua: ' + rua);
        console.log('Bairro: ' + bairro);
        console.log('Cidade: ' + cidade);
        console.log('UF: ' + uf);
        console.log('NÃºmero: ' + numero);
        console.log('Data de Nascimento: ' + dataNascimento);
        console.log('Senha: ' + senha);

        console.log('O formulario foi submetido'); // teste

        // Limpar os campos do formulÃ¡rio
        $('input[type="text"], input[type="email"], input[type="password"], input[type="date"]').val('');

    });

    // FunÃ§Ã£o para validar CPF
    function validarCPF(cpf) {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf === '') return false;
        // Elimina CPFs invÃ¡lidos conhecidos
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
        // Valida 1Âº dÃ­gito
        let add = 0;
        for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
        let rev = 11 - (add % 11);
        if (rev === 10 || rev === 11) rev = 0;
        if (rev !== parseInt(cpf.charAt(9))) return false;
        // Valida 2Âº dÃ­gito
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


// FunÃ§Ã£o para avanÃ§ar para o prÃ³ximo slide
function nextSlide() {
    $('.carousel').slick('slickNext');
}

// FunÃ§Ã£o para voltar para o slide anterior
function prevSlide() {
    $('.carousel').slick('slickPrev');
}

// Atribua as funÃ§Ãµes aos eventos de clique dos botÃµes
$('.carousel-button.next').click(nextSlide);
$('.carousel-button.prev').click(prevSlide);

$(document).ready(function () {
    // Ocultar botÃµes originais do Slick Carousel
    $('.slick-prev, .slick-next').hide();

    // Vincular eventos aos botÃµes de navegaÃ§Ã£o personalizados
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

// Ocultar overlay do alerta ao clicar no botÃ£o "Fechar"
$('.alert-overlay .close-btn').click(function () {
    $('.alert-overlay').fadeOut();
});



//TESTE DE LOGIN////////////////////

// VariÃ¡vel para armazenar o nome do usuÃ¡rio logado
var nomeUsuario = localStorage.getItem("nomeUsuario");

// FunÃ§Ã£o para verificar o login
function verificarLogin() {
    var usuario = document.getElementById("login-usuario").value;
    var senha = document.getElementById("login-senha").value;

    // Verificar as credenciais (exemplo simples)
    if (usuario === "admin" && senha === "senha123") {
        // Login bem-sucedido
        document.getElementById("login-usuario").value = ""; // Limpar o campo de usuÃ¡rio
        document.getElementById("login-senha").value = ""; // Limpar o campo de senha

        // Fechar o evento de login
        $('.login-overlay').fadeOut();

        // Salvar o nome de usuÃ¡rio no localStorage
        localStorage.setItem("nomeUsuario", usuario);

        // Atualizar o valor da variÃ¡vel nomeUsuario
        nomeUsuario = usuario;

        // Exibir o nome do usuÃ¡rio no botÃ£o de login
        document.getElementById("login-btn").innerText = nomeUsuario;


    } else {
        // Exibir mensagem de erro de login
        exibirAlerta("Credenciais invÃ¡lidas");
    }

    // Exibir o botÃ£o de logout
    $('#logout-btn').show();

}
// FunÃ§Ã£o para exibir um alerta na tela
function exibirAlerta(mensagem) {
    document.getElementById("alert-message").innerText = mensagem;
    $('.alert-overlay').fadeIn();

    // Fechar o alerta ao clicar no botÃ£o "Fechar"
    $('.close-btn').click(function () {
        $('.alert-overlay').fadeOut();
    });
}

// Exibir overlay de login ao clicar no botÃ£o "Entrar"
$('#login-btn').click(function () {
    $('.login-overlay').fadeIn();
});

// Ocultar overlay de login ao clicar no botÃ£o "Cancelar"
$('#login-cancel').click(function () {
    $('.login-overlay').fadeOut();
});

// Verificar o login ao clicar no botÃ£o "Entrar" na tela de login
$('#login-submit').click(function () {
    verificarLogin();
});

// Verificar o login ao pressionar Enter no campo de senha na tela de login
$('#login-senha').keypress(function (e) {
    if (e.which === 13) {
        verificarLogin();
    }
});

// Verificar se hÃ¡ um nome de usuÃ¡rio armazenado e exibir no botÃ£o de login
if (nomeUsuario) {
    document.getElementById("login-btn").innerText = nomeUsuario;
}

// FunÃ§Ã£o para fazer logout e apagar as informaÃ§Ãµes do localStorage

function fazerLogout() {
    // Remover o nome de usuÃ¡rio do localStorage
    localStorage.removeItem("nomeUsuario");

    // Atualizar o valor da variÃ¡vel nomeUsuario
    nomeUsuario = null;

    // Atualizar o texto do botÃ£o de login
    document.getElementById("login-btn").innerText = "Entrar";

    // Ocultar o botÃ£o de logout
    $('#logout-btn').hide();

    //  exibir o botÃ£o de logout
    document.getElementById("logout-btn").classList.add("show");
}

$(document).ready(function () {
    // Adicionar evento de clique ao botÃ£o de logout
    $('#logout-btn').click(function () {
        fazerLogout();
    });

    // Limpar informaÃ§Ãµes e ocultar o botÃ£o "Logout" ao clicar nele
    $('#logout-btn').click(function () {
        // Limpar informaÃ§Ãµes aqui
        // Exemplo: Limpar informaÃ§Ãµes do usuÃ¡rio atual

        // Ocultar o botÃ£o "Logout"
        $(this).hide();
    });
});

