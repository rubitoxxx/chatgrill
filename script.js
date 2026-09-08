/* =========================================================
   Central de Suporte Agrosys — chatbot local (sem backend)
   Busca por palavras-chave sobre a base extraída da planilha
   de "Solução de Chamados".
   ========================================================= */

const KB = [
  {
    "pergunta": "não consegue salvar uma nfe",
    "erro": "O diretório configurado “\\\\SRVDE01\\Integracao\\%filial%\\processar\\NFe ” não está acessível para gravação de NF-e.",
    "solucao": "Acesse o Active Directory (AD), pesquise pelo usuário e abra as propriedades. Na aba Membros de, adicione os grupos “GRP_RDS_ERP” e “GRP_RDS_ERP HOMOLOGAÇÃO” no domínio do usuário. Em seguida, faça logoff do sistema.",
    "palavra_chave": "DIRETÓRIO"
  },
  {
    "pergunta": "Não estou conseguindo acessar o Sênior, fui liberar uma nota ele travou, desde então não entra mais, fica aparecendo credenciais invalidas, mais está correto.",
    "erro": "CREDENCIAIS INATIVAS",
    "solucao": "Acesse o sistema Senior e vá em Cadastro > Personalizado > Controle de Conexão.\nNo filtro simples, defina:\nCondição: Contendo\nValor: Matrícula\nClique em Adicionar e depois em OK.\nEm seguida, clique no botão Excluir.",
    "palavra_chave": "CREDENCIAIS INATIVAS    DERRUBAR DO SÊNIOR"
  },
  {
    "pergunta": "liberação do campo \"depósito\". Não encontrei nas configurações.\nSuprimentos, gestão de recebimento, notas fiscais de entrada, via recebimento eletrônico.",
    "erro": "Liberação do campo deposito",
    "solucao": "apertar no botão restaurar original e o campo volta a aparecer",
    "palavra_chave": "CAMPO DEPOSITO"
  },
  {
    "pergunta": "NÃO EXISTE CIDADE CADASTRADA",
    "erro": "Não foi possível emitir a(s) Nota(s) - Problema na geração do arquivo da nota eletrônica 361090. Empresa: 1 - Filial: 45 - Série: NFE. Erro: Não existe uma cidade cadastrada para o CEP de entrega \"79968899\" ou o código rais não foi informado no cadastro de endereço de entrega do cliente \"426187\". Empresa \"1\", Filial \"45\", Série \"NFE\", Nota \"361090\".",
    "solucao": "Acesse o sistema Senior e vá até Cadastro > Cadastro do Cliente. Clique no botão Endereço. Caso não haja endereço cadastrado, vá em Cidades > CEP Gerada, cadastre o endereço e depois adicione-o no cadastro do cliente.",
    "palavra_chave": "CIDADE CADASTRADA"
  },
  {
    "pergunta": "erro na inclusão do item do produto.",
    "erro": "Erro na inclusão do item de produto.\nProduto 35080.0005 # Derivação 001 # Depósito # Quantidade 1,00\nErro original: Data de entrega menor que data atual (-) parâmetro definido na filial em\n\"F070FVE - Cadastros > Filiais > Parâmetros por Gestão > Vendas, Faturamento e Transporte\" no campo \"Dias Antes Aceita Pedido\".",
    "solucao": "Clique no botão Personalizar e adicione o tipo de frete, por exemplo: “x”.",
    "palavra_chave": "ERRO INCLUSÃO PEDIDO"
  },
  {
    "pergunta": "erro ao gerar movimentação de estoque",
    "erro": "Regra 129: valor do movimento deve ser ###,##.",
    "solucao": "No sênior vai em Cadastro – Personalizadas\nCadastro de usuário para exceções em regras.\nEmpresa: 1\nSequência: \nClique nas duas setas para baixo.\nSelecione a regra desejada.\nAdicione o usuário.\nSalve as alterações.",
    "palavra_chave": "REGRA 129"
  },
  {
    "pergunta": "",
    "erro": "erro ao imprimir",
    "solucao": "Acesse o servidor, envie qualquer arquivo para impressão e altere a configuração da impressora recomendada para a impressora padrão.",
    "palavra_chave": "Regra 92"
  },
  {
    "pergunta": "erro ao faturar pedido",
    "erro": "operação não permitida para este usuário",
    "solucao": "aplica o perfil de faturamento",
    "palavra_chave": "erro ao faturar pedido / usuário sem autorização"
  },
  {
    "pergunta": "somente usuario comprador da sede po",
    "erro": "",
    "solucao": "vai em cadastro do usuário e colocar sim em usuário comprador",
    "palavra_chave": "somente usuário comprador da sede pode alterar"
  },
  {
    "pergunta": "incluir o e-mail  no envio diário do relatório SRPR112.GER que o sistema gera e envia de forma automática toda manhã.",
    "erro": "",
    "solucao": "vai em recucos – processos automáticos -cadastro – e-mail     em código do processo escolhe o processo e destinatário da mensagem digita o e-mail ; no final",
    "palavra_chave": "E-MAIL AUTOMÁTICOS"
  },
  {
    "pergunta": "erro de geração",
    "erro": "NOTA COM ERRO DE GERAÇÃO",
    "solucao": "vai no edocs na aba de criticas de integração",
    "palavra_chave": "ERRO DE GERAÇÃO"
  },
  {
    "pergunta": "Quantidade informada é maior do que a permitida pelo cliente.",
    "erro": "Quantidade informada é maior do que a permitida pelo cliente.",
    "solucao": "Acesse o Senior e faça logon na filial onde deseja realizar o pedido.\nVá para o Cadastro do Cliente.\nDigite o código do cliente.\nNa aba Definições, localize o campo % acima pedido aceito.\nDefina o valor como 100%.",
    "palavra_chave": "Quantidade maior que o pedido"
  },
  {
    "pergunta": "Usuário não possui permissão para gerar devolução!",
    "erro": "baixa por cheque e recebimento",
    "solucao": "vai em cadastro -usuário -parâmetros por gestão – contas a receber – na aba baixas contas a receber – marque sim em permitir gerar devolução",
    "palavra_chave": "Usuário não possui permissão para gerar devolução!"
  },
  {
    "pergunta": "verificar nota de entrada com titulo",
    "erro": "",
    "solucao": "vai em finanças/gestão de contas a pagar / contas a pagar / consulta / titulo",
    "palavra_chave": ""
  },
  {
    "pergunta": "violação de chave",
    "erro": "tela proibida",
    "solucao": "Precisar esta logado na filial a qual deu o erro de violação de chave NF020SNF - Cadastro / Mercado e Suprimentos / Parâmetros Fiscais / Séries Notas Fiscais / Cadastro (Séries de Notas Fiscais)",
    "palavra_chave": "violação de chave"
  },
  {
    "pergunta": "nosso numero",
    "erro": "",
    "solucao": "vai em cadastro – finanças – portadores – la com muito cuidado você vai em último nosso numero . Sempre colocando o numero da sequencia",
    "palavra_chave": "nosso numero"
  },
  {
    "pergunta": "Regra 433",
    "erro": "Regra 433: Usuário solicitante não possui configuração de aprovação automática! Entre em contato com a TI.",
    "solucao": "Acesse o sênior: Cadastro > Usuários > Cadastro de Usuário. No campo superior imediato, insira o código do Sênior correspondente ao próprio usuário.",
    "palavra_chave": "regra 433"
  },
  {
    "pergunta": "Importar nota para homologação",
    "erro": "",
    "solucao": "Abra o arquivo XML da nota, localize o campo <tpAmb>1</tpAmb> e altere para <tpAmb>2</tpAmb>. Em seguida, importe o arquivo no eDocs em ambiente de homologação.",
    "palavra_chave": "XML EM HOMOLOGAÇÃO"
  },
  {
    "pergunta": "CHECKOUT",
    "erro": "vincular checkout ao usuário",
    "solucao": "Acesse o Sênior ,Finanças / Personalizadas / USU_F_T000CHK o código é a filial do usuario",
    "palavra_chave": "CHECKOUT"
  },
  {
    "pergunta": "Devolução Produtos Agrícolas Retirada",
    "erro": "Expedição via Nota Entrada Devolução (Saída via Balança (Expedição via Nota Entrada))",
    "solucao": "A tela Devolução Produtos Agrícolas Retirada é a mesma tela Expedição via Nota Entrada Devolução (Saída via Balança (Expedição via Nota Entrada)                                            -----------------------------------------------------caminho para tela : NF115COE_RFSB - Mercado / Gestão de Faturamento e Outras Saídas / Saída via Balança / Expedição via Nota Entrada Devolução (Saída via Balança (Expedição via Nota Entrada))",
    "palavra_chave": "Tela NF11COE_RFSB"
  },
  {
    "pergunta": "validação de produtos para exportação para o varejo",
    "erro": "validação de produtos para exportação para o varejo",
    "solucao": "Acesse o Senior.\nVá para Cadastro > Relatórios > Produtos e Serviços.\nSelecione o relatório 123 – Validação de produtos para exportação para o varejo.",
    "palavra_chave": "IMPORTAR PRODUTO"
  },
  {
    "pergunta": "servidor do pdv de homologação",
    "erro": "",
    "solucao": "10.38.0.233",
    "palavra_chave": "PDV DE HOMOLOGAÇÃO"
  },
  {
    "pergunta": "problema com convenio , titulo , consulta",
    "erro": "",
    "solucao": "Reiniciar o integrador Megasul x Senior",
    "palavra_chave": ""
  },
  {
    "pergunta": "PASTA PARTICULAR Z",
    "erro": "",
    "solucao": "No Active Directory, localize o usuário e abra as propriedades. Na aba Perfil, selecione a opção Conectar. Escolha a letra Z: e insira o caminho: \\\\SRVFS01\\Home$\\%username%. Em seguida, clique em Aplicar e depois em OK.",
    "palavra_chave": "PASTA PARTICULAR Z"
  },
  {
    "pergunta": "configurar para que os  e-mails de um usuário ser encaminhado para o e-mail outro usuário",
    "erro": "",
    "solucao": "Passo a passo para configurar o encaminhamento de e-mails:\nAcesse o portal: https://admin.cloud.microsoft/.\nNo menu lateral, vá para Usuários > Usuários ativos.\nNo campo de pesquisa, digite o e-mail do usuário e clique no nome dele.\nNa página do usuário, selecione a aba E-mail.\nClique na opção Encaminhamento de e-mail (Gerenciar encaminhamento de e-mail).\nMarque a caixa Encaminhar todos os e-mails enviados para esta caixa de correio.\nDigite o endereço de e-mail para o qual deseja encaminhar as mensagens.\nClique em Salvar alterações.",
    "palavra_chave": "ENCAMINHAR E-MAIL"
  },
  {
    "pergunta": "pasta (Y) scanner",
    "erro": "scanner(Y:)",
    "solucao": "acesse o Active Directory (AD), pesquise pelo usuário e abra as propriedades. Na aba Membros de, adicione os grupos setor a qual ela esta no AD ou mova o usuário para a pasta do setor",
    "palavra_chave": "SCANNER"
  },
  {
    "pergunta": "Nao foi possivel localizar o modelo: \"SRPR124.GER\". Deve ser verificado se o mesmo realmente existe.",
    "erro": "Nao foi possivel localizar o modelo: \"SRPR124.GER\". Deve ser verificado se o mesmo realmente existe.",
    "solucao": "",
    "palavra_chave": "relatório não encontrado"
  },
  {
    "pergunta": "SERVIDOR: NÃO É POSSÍVEL INICIAR O SISTEMA!\nVersão do Sistema: 7949 (Módulo) 16/10/2024 08:42\nVersão do Banco de Dados.: 8028",
    "erro": "sighaposto.exe - Ponto de entrada não encontrado\nX de PF procedimento SoNumerosCPF_CNPJ na biblioteca de vinculo possível localizar o ponto de entrada do dinámico C:\\Sighaib\\sighaposto.exe. AN OK 58.268 KB",
    "solucao": "ao substituir o sighaposto.exe na pasta ibsigha substitua também o sighadll",
    "palavra_chave": ""
  },
  {
    "pergunta": "tecla do pdv não funcionando",
    "erro": "tecla do pdv não funcionando",
    "solucao": "vai no cadastro do megasul e ver se esta filial correta e ususario adminstrador 999999",
    "palavra_chave": "tecla do pdv não funcionando"
  },
  {
    "pergunta": "quando as notas não vão para o edocs",
    "erro": "",
    "solucao": "Abra o Explorador de Arquivos no Windows.\nAcesse o servidor digitando: \\\\192.168.102.50\nEntre na pasta integração.\nLocalize a pasta correspondente à filial.\nDentro dela, abra a pasta processado.\nProcure a subpasta do tipo da nota (ex.: NFe, CTe, etc.).\nPara encontrar a nota desejada, use a barra de pesquisa e digite: **[número da nota]\n(os dois asteriscos antes do número são importantes).\nApós localizar a nota, copie o arquivo.\nCole-o na pasta processar, dentro da subpasta do mesmo tipo de nota (ex.: NFe, CTe, etc.).\nPor fim, acesse o eDocs e verifique se a nota foi carregada corretamente.",
    "palavra_chave": "nota não subiu para o edocs"
  },
  {
    "pergunta": "para abastecidas caírem na tela",
    "erro": "",
    "solucao": "O automação Sigha precisa esta aberto",
    "palavra_chave": ""
  },
  {
    "pergunta": "Quando ocorrer um problema na SEFAZ e for necessário garantir que as notas do caixa continuem funcionando mesmo durante a indisponibilidade da SEFAZ.",
    "erro": "",
    "solucao": "Na retaguarda, na aba de Nota Fiscal Eletrônica, marque a opção (checkbox) “Forçar transmissão de NFC-e em contingência na filial”",
    "palavra_chave": ""
  },
  {
    "pergunta": "erro no relatório RFNF120.GER",
    "erro": "Não foi possível emitir a(s) Nota(s) - Problema na geração do arquivo da nota eletrónica 266470. Empresa: 1-Filiat 14-Série: NFE. Erro: Regra 92: Função de programador ExecutaRelatorio: Execução do modelo de relatório \"RFNF120.GER: Não houve informações a listar.",
    "solucao": "Para realizar o procedimento loga na filial, siga os passos abaixo:\nAcesse  F140PRE – Preparação de Nota Fiscal de Saída.\nMarque a opção \"Consultar NF (3)\".\nDigite o número da nota fiscal de saída.\nClique no botão \"Mostrar\".\nAbra o botão \"N.F.\" e vá até a aba Parcela.\nSe a nota estiver sem parcelas (zerada), será necessário adicionar uma parcela.\nPara adicionar a parcela, primeiro é preciso reabilitar a nota.\nAcesse o módulo F140CAN – Emissão e Cancelamento de Notas Fiscais de Saída.\nDigite o número da nota nos dois campos disponíveis.\nMarque a opção \"Reabilitar Notas\".\nClique em \"Mostrar\".\nInforme o motivo 7 – Operação não concluída.\nClique em \"Processar\" para concluir a reabilitação.\nApós reabilitar a nota:\nVolte ao F140PRE.\nAdicione a parcela necessária.\nClique em \"Processar\" para finalizar.",
    "palavra_chave": "erro no relatório"
  },
  {
    "pergunta": "senior esta no layout antigo",
    "erro": "Recurso – desativar xtend – habilitar – sair e entrar de novo",
    "solucao": "",
    "palavra_chave": ""
  },
  {
    "pergunta": "Quando o PED e a DUP não se compensam.",
    "erro": "Quando o PEDedido realizado na transação 90117gera uma PED , quando o PED  é pago, o sistema gera um ADT com o mesmo valor do PED, porém em valor negativo.\nQuando a nota é gerada (DUP), o PED e a ADT se compensam.\nAssim, PED, ADT e DUP são liquidados.",
    "solucao": "Quando não ocorre a compensação, significa que a regra parou de executar. Nesse caso, podemos executá‑la manualmente acessando Recursos > Processos Automáticos > Cadastro.\nVerifique dois pontos no processo:\nCódigo do processo 85 – “Compensação do Adiantamento do Pedido com as Duplicatas”.\nAo abrir o processo 85, clique no botão Cancelar e depois no botão Log.\nQuando o log carregar, verifique a última data de execução.\nSe o processo tiver parado de executar, vá em:\nRecursos > Implementações > Regras > Executar\nDigite o código da regra e execute.\nOnde encontrar o código da regra?\nEm Recursos > Processos Automáticos > Cadastro.\nExemplo:\nCódigo do processo: 85\nCódigo da regra correspondente: 172",
    "palavra_chave": ""
  },
  {
    "pergunta": "cadastro de fornecedor",
    "erro": "cadastrar fornecedor",
    "solucao": "",
    "palavra_chave": ""
  },
  {
    "pergunta": "o modulo do senior RH para de funcionar",
    "erro": "",
    "solucao": "Copiar iniciar.exe para voltar abrir os modulos do vertorh\nVai em:\n\\\\192.168.102.40\\VetorhProducao\\BKP Iniciar\nCopia o inciar\nE\nCola o inicar em : \\\\192.168.102.40\\VetorhProducao",
    "palavra_chave": ""
  },
  {
    "pergunta": "excluir ou adiconar e-mail ao processo automatico do sistema",
    "erro": "cadastra e-mail automáticos",
    "solucao": "vai em recursos / processos automaticos /cadastros \nNo campo de codigo do processo vai nas duas setas para baixo , procur pelo processo edepois no campo destinatario mensagem muda o e-mail ,excluir, ou adciona.",
    "palavra_chave": ""
  },
  {
    "pergunta": "usuario do edcs admin",
    "erro": "",
    "solucao": "Usuário 221 integração.sde",
    "palavra_chave": ""
  },
  {
    "pergunta": "erro de integração",
    "erro": "Processado com sucesso. Ocorreram erros no processamento nota fiscal \"146869\", série \"NFE\" já integrada ao módulo de impostos. Para integrar o cancelamento, realize o estorno de lançamento da nota fiscal na Gestão de Tributos.",
    "solucao": "falar com o financeiro",
    "palavra_chave": ""
  },
  {
    "pergunta": "Regra 515 transação incorreta para ato cooperado veri",
    "erro": "",
    "solucao": "",
    "palavra_chave": ""
  },
  {
    "pergunta": "integração de nota",
    "erro": "Regra 272 : 35018.0083 – 001. Não existem lotes para atender a quantidade de 1,00 para o faturamento!",
    "solucao": "o pessoal do filial resolve",
    "palavra_chave": ""
  },
  {
    "pergunta": "fazer o processo de transferência",
    "erro": "Registro com o valor <90121> para o campo <Transação não existe na base ou está indisponível para este usuário.",
    "solucao": "vai em NF099UVE - Cadastro / Usuários / Parâmetros por Gestão / Vendas, Faturamento e Transporte (Parâmetros de Usuário para Vendas)\n- funcionário responsável para realizar qualquer tipo de transferência entre produtos : S",
    "palavra_chave": ""
  },
  {
    "pergunta": "fazer uma nota de saída e cancelar ela",
    "erro": "",
    "solucao": "Acesse o caminho: NF141CNS_RFNF – Mercado / Gestão de Faturamento e Outras Saídas / Notas Fiscais de Saída / Consultas / Dados Gerais (Consulta de Notas Fiscais de Saída).\nEscolha uma nota e tente refazê-la.\nEu utilizei a seguinte nota:\n\nNFe 1.801.578\nProduto: 35068.0140 D 001\nCliente: 439816\n\nDepois, fiz o pedido em:\nNF120GPB_RVPE – Mercado / Gestão de Vendas / Pedidos / Simplificada (Pedidos – Entrada de Pedidos Simplificada)\nDados do pedido:\n\nPedido: 800.768\nCliente: 439.816\nTransação: 90110\nProduto: 35068.0140 D 001\n\nPara gerar a nota, utilizei:\nNF140PRE_RFNF – Mercado / Gestão de Faturamento e Outras Saídas / Notas Fiscais de Saída / Individual via Pedidos e Notas Fiscais (Preparação da Nota Fiscal de Saída)\nResultado:\n\nNota Fiscal: 1.801.660\n\nPor fim, para cancelar a nota, acessei:\nNF140CAN_RFNF – Mercado / Gestão de Faturamento e Outras Saídas / Notas Fiscais de Saída / Emissão e Cancelamento / Nota Fiscal (Emissão ou Cancelamento de Notas Fiscais de Saída)\nE realizei o cancelamento.",
    "palavra_chave": ""
  },
  {
    "pergunta": "Erro durante baixa de substituição",
    "erro": "Regra 215:\nProcesso cancelado!\nSubstituição liberada somente para APO ou APA!\nSubstituição liberada somente para a transação 905251",
    "solucao": "Vai em NF099UCA - Cadastro / Usuários / Cadastro (Cadastro de Usuários)\nNo parâmetro alterar valores sugeridos C.pagar",
    "palavra_chave": ""
  },
  {
    "pergunta": "servidor das impressoras",
    "erro": "",
    "solucao": "192.168.102.12\nReiniciar o spool",
    "palavra_chave": ""
  },
  {
    "pergunta": "problema no cimm",
    "erro": "cimm não fechado , ou vinculado nota viculada em outro cimm",
    "solucao": "alterar valor liquido",
    "palavra_chave": ""
  },
  {
    "pergunta": "alterar valor liquido",
    "erro": "Baixa por Recebimento de Cheques/Diversos do Contas a Receber",
    "solucao": "",
    "palavra_chave": ""
  },
  {
    "pergunta": "Usuário não tem permissão para Consultar lançamentos! \nF650CLC",
    "erro": "Usuário não tem permissão para Consultar lançamentos!",
    "solucao": "Acesse a tela F099UCT - Cadastros / Usuários / Parâmetros por Gestão / Contabilidade, informe o usuário e no campo Direito Acesso Contabilidade informe a opção 'C'-Completo",
    "palavra_chave": ""
  },
  {
    "pergunta": "Usuário não consegue fechar a nota de entrada \n\nTela F000INE",
    "erro": "Diferença entre o valor total da Nota Fiscal e da Ordem de Compra é maior que o valor permitido para o usuário.",
    "solucao": "NF099UCP - Cadastro / Usuários / Parâmetros por Gestão / Compras e Recebimento (Parâmetros de Usuário para Compras e Recebimento)\nDigita o código do usuário \ne no campo “Valor Aceito Diferença NFE” coloca 50,00",
    "palavra_chave": ""
  },
  {
    "pergunta": "megasul servidor de homologação",
    "erro": "",
    "solucao": "192.168.102.170 - Novo Server 2022",
    "palavra_chave": ""
  },
  {
    "pergunta": "link para balança",
    "erro": "http://192.168.102.45:8080/g5-senior-services/sapiens_Synccom_senior_g5_co_int_prisma_balanca",
    "solucao": "",
    "palavra_chave": ""
  }
];

const PROFILES = [
  {
    "nome": "cadastros financeiro",
    "codigo": 3391,
    "aplicar_parametros": ""
  },
  {
    "nome": "Cadastros Suprimentos",
    "codigo": 3392,
    "aplicar_parametros": ""
  },
  {
    "nome": "Cadastros Mercado",
    "codigo": 3393,
    "aplicar_parametros": ""
  },
  {
    "nome": "Cadastros Contábeis",
    "codigo": 3394,
    "aplicar_parametros": ""
  },
  {
    "nome": "Cadastros Manufatura",
    "codigo": 3395,
    "aplicar_parametros": ""
  },
  {
    "nome": "Cadastros Serviços",
    "codigo": 3396,
    "aplicar_parametros": ""
  },
  {
    "nome": "Cadastros Receituário",
    "codigo": 3397,
    "aplicar_parametros": ""
  },
  {
    "nome": "Cadastros Custos",
    "codigo": 3418,
    "aplicar_parametros": ""
  },
  {
    "nome": "contasreceber",
    "codigo": 3114,
    "aplicar_parametros": "Lib.Parâmetro C.P:\nAltera vlr Liquido"
  },
  {
    "nome": "contaspagar",
    "codigo": 3115,
    "aplicar_parametros": "Parâmetro C.R:\n\nAltera vlr Liquido"
  },
  {
    "nome": "tesouraria",
    "codigo": 3116,
    "aplicar_parametros": "Parâmetro:\nPrep. tesour.(origem na tesour.) processada"
  },
  {
    "nome": "pagamentoeletronico",
    "codigo": 3349,
    "aplicar_parametros": ""
  },
  {
    "nome": "cobrançaescritural",
    "codigo": 3350,
    "aplicar_parametros": ""
  },
  {
    "nome": "financeiroconciliacao",
    "codigo": 3351,
    "aplicar_parametros": ""
  },
  {
    "nome": "financiamentos",
    "codigo": 3352,
    "aplicar_parametros": ""
  },
  {
    "nome": "financeirogerencial",
    "codigo": 2230,
    "aplicar_parametros": ""
  },
  {
    "nome": "caixa básico",
    "codigo": 4626,
    "aplicar_parametros": "Parâmetro de usuário: Altera valor liquido - tela F099UPA e F099URE\nAinda na F099URE parametro Permite Gerar devolução de saldo."
  },
  {
    "nome": "perfil credito",
    "codigo": 4785,
    "aplicar_parametros": ""
  },
  {
    "nome": "Solicitação",
    "codigo": 2718,
    "aplicar_parametros": ""
  },
  {
    "nome": "cotação",
    "codigo": 3353,
    "aplicar_parametros": ""
  },
  {
    "nome": "ordens de compra",
    "codigo": 2720,
    "aplicar_parametros": ""
  },
  {
    "nome": "contratos De compra",
    "codigo": 3355,
    "aplicar_parametros": ""
  },
  {
    "nome": "Recebimento",
    "codigo": 2719,
    "aplicar_parametros": "Parâmetro:\n\nSimula Fechamento: S"
  },
  {
    "nome": "Balança",
    "codigo": 3117,
    "aplicar_parametros": "Parâmetro Recebimento:\n\nPermitir Alt. Prod. e Classificação do Ticket: S"
  },
  {
    "nome": "requisição",
    "codigo": 3363,
    "aplicar_parametros": "Parâmetro Cadastro:\n\nSuperior Imediato: Proprio usuário"
  },
  {
    "nome": "reposição",
    "codigo": 3364,
    "aplicar_parametros": ""
  },
  {
    "nome": "inventário",
    "codigo": "c",
    "aplicar_parametros": ""
  },
  {
    "nome": "Cimm",
    "codigo": 3365,
    "aplicar_parametros": ""
  },
  {
    "nome": "leite",
    "codigo": 3136,
    "aplicar_parametros": ""
  },
  {
    "nome": "controleprodutor",
    "codigo": 3381,
    "aplicar_parametros": ""
  },
  {
    "nome": "comprasgerencial",
    "codigo": 294,
    "aplicar_parametros": ""
  },
  {
    "nome": "orçamentos",
    "codigo": 3354,
    "aplicar_parametros": ""
  },
  {
    "nome": "Pedidos",
    "codigo": 3356,
    "aplicar_parametros": ""
  },
  {
    "nome": "contratos de vendas",
    "codigo": 3357,
    "aplicar_parametros": ""
  },
  {
    "nome": "Receituário",
    "codigo": 3358,
    "aplicar_parametros": ""
  },
  {
    "nome": "distribuição (expedição)",
    "codigo": 3359,
    "aplicar_parametros": ""
  },
  {
    "nome": "Faturamento",
    "codigo": 3360,
    "aplicar_parametros": "Parâmetro:\n\nAltera situação Pedido: S\nAltera situação NF Saída: S\nCancelar NF Saida: S\nAlterar dados gerais NF: S\n---\nParâmetro:\n\nSimula Fechamento: S"
  },
  {
    "nome": "Relacionamento (crm)",
    "codigo": 3361,
    "aplicar_parametros": ""
  },
  {
    "nome": "vendasgerencial",
    "codigo": 3362,
    "aplicar_parametros": ""
  },
  {
    "nome": "vendas base",
    "codigo": 2227,
    "aplicar_parametros": ""
  },
  {
    "nome": "agronomo base",
    "codigo": 4786,
    "aplicar_parametros": ""
  },
  {
    "nome": "Supply",
    "codigo": 4810,
    "aplicar_parametros": ""
  },
  {
    "nome": "contabilidade",
    "codigo": 1495,
    "aplicar_parametros": ""
  },
  {
    "nome": "tributos",
    "codigo": 3366,
    "aplicar_parametros": ""
  },
  {
    "nome": "patrimonio",
    "codigo": 3367,
    "aplicar_parametros": ""
  },
  {
    "nome": "contabilgerencial",
    "codigo": 1495,
    "aplicar_parametros": ""
  },
  {
    "nome": "manufatura nutricao",
    "codigo": 3602,
    "aplicar_parametros": ""
  },
  {
    "nome": "manufatura PCP",
    "codigo": 3603,
    "aplicar_parametros": ""
  },
  {
    "nome": "manufatura apontamento",
    "codigo": 3604,
    "aplicar_parametros": ""
  },
  {
    "nome": "engenharia",
    "codigo": 3371,
    "aplicar_parametros": ""
  },
  {
    "nome": "inspeções",
    "codigo": 3665,
    "aplicar_parametros": ""
  },
  {
    "nome": "Ambiental",
    "codigo": 3368,
    "aplicar_parametros": ""
  },
  {
    "nome": "custos",
    "codigo": 3419,
    "aplicar_parametros": ""
  },
  {
    "nome": "custosgerencial",
    "codigo": 3722,
    "aplicar_parametros": ""
  },
  {
    "nome": "ordensserviço",
    "codigo": 3370,
    "aplicar_parametros": ""
  },
  {
    "nome": "manutenção",
    "codigo": 3375,
    "aplicar_parametros": ""
  },
  {
    "nome": "assistenciatécnica",
    "codigo": 3376,
    "aplicar_parametros": ""
  },
  {
    "nome": "servicogerencial",
    "codigo": 3377,
    "aplicar_parametros": ""
  },
  {
    "nome": "auditoria",
    "codigo": 4093,
    "aplicar_parametros": ""
  },
  {
    "nome": "Consultas / Relatórios",
    "codigo": 3517,
    "aplicar_parametros": ""
  },
  {
    "nome": "perfil.parametros",
    "codigo": 3386,
    "aplicar_parametros": ""
  },
  {
    "nome": "Perfil Fornecedor",
    "codigo": 2463,
    "aplicar_parametros": ""
  },
  {
    "nome": "ConsultasRelatóriosGerencial",
    "codigo": 3777,
    "aplicar_parametros": ""
  },
  {
    "nome": "perfil.cd (adm cd)",
    "codigo": 2375,
    "aplicar_parametros": ""
  }
];

/* ---------- utilidades de texto ---------- */

function normalize(str) {
  return (str || '')
    .toString()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[^a-z0-9%\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

const STOPWORDS = new Set([
  'a','o','os','as','de','da','do','das','dos','em','no','na','nos','nas',
  'um','uma','uns','umas','e','ou','que','com','para','por','ao','aos',
  'se','sua','seu','suas','seus','como','foi','esta','esse','essa','isso',
  'nao','sim','vai','tem','ter','fazer','favor','preciso','gostaria'
]);

function tokenize(str) {
  return normalize(str)
    .split(' ')
    .filter(w => w.length > 2 && !STOPWORDS.has(w));
}

/* ---------- índice de busca ---------- */

const INDEX = KB.map(entry => {
  const haystack = [entry.pergunta, entry.erro, entry.palavra_chave].join(' ');
  return {
    entry,
    tokens: new Set(tokenize(haystack)),
    normFull: normalize(haystack)
  };
});

function scoreEntry(queryTokens, queryNorm, item) {
  let score = 0;

  // pontua por token da consulta presente na base
  queryTokens.forEach(t => {
    if (item.tokens.has(t)) score += 1;
  });

  // bônus forte: a consulta inteira (ex: mensagem de erro colada) aparece
  // como substring do conteúdo indexado
  if (queryNorm.length > 8 && item.normFull.includes(queryNorm)) {
    score += 4;
  }

  return score;
}

function findBestMatches(query, limit = 1) {
  const queryNorm = normalize(query);
  const queryTokens = tokenize(query);
  if (queryTokens.length === 0) return [];

  const scored = INDEX
    .map(item => ({ item, score: scoreEntry(queryTokens, queryNorm, item) }))
    .filter(s => s.score > 0)
    .sort((a, b) => b.score - a.score);

  if (scored.length === 0) return [];

  // confiança mínima: exige ao menos 1 token real batendo
  return scored.slice(0, limit);
}

/* ---------- busca de perfis (nome ↔ código) ---------- */

// palavras que aparecem na pergunta mas não fazem parte do nome do perfil
const PROFILE_FILLER = new Set([
  'perfil','perfis','codigo','código','code','nome','qual','quais',
  'informe','diga','favor','gostaria','saber','sobre','desse','dessa',
  'e','o','a','me','do','da','de','dos','das'
]);

function profileQueryTokens(query) {
  return tokenize(query).filter(t => !PROFILE_FILLER.has(t));
}

// busca por código exato (aceita "3391", "código 3391", "perfil 3391"...)
function tryProfileByCode(query) {
  const digits = query.match(/\d+/g);
  if (!digits) return null;
  for (const d of digits) {
    const found = PROFILES.filter(p => String(p.codigo).toLowerCase() === d.toLowerCase());
    if (found.length) return found;
  }
  return null;
}

// busca por nome (aceita nome parcial, com ou sem acento/maiúsculas)
function tryProfileByName(query) {
  const qTokens = profileQueryTokens(query);
  if (qTokens.length === 0) return null;

  const candidates = PROFILES.map(p => {
    const pTokens = tokenize(p.nome);
    const pSet = new Set(pTokens);
    const overlap = qTokens.filter(t => pSet.has(t)).length;
    const isSubsetEither = overlap > 0 && (overlap === qTokens.length || overlap === pTokens.length);
    return { p, overlap, isSubsetEither, pTokensLen: pTokens.length };
  }).filter(c => c.overlap > 0);

  if (candidates.length === 0) return null;

  const strong = candidates.filter(c => c.isSubsetEither);
  const pool = strong.length ? strong : candidates;
  pool.sort((a, b) => b.overlap - a.overlap || a.pTokensLen - b.pTokensLen);

  const topOverlap = pool[0].overlap;
  return pool.filter(c => c.overlap === topOverlap).slice(0, 6).map(c => c.p);
}

/* ---------- UI ---------- */

const threadEl = document.getElementById('thread');
const formEl = document.getElementById('composer');
const inputEl = document.getElementById('input');
const topicListEl = document.getElementById('topicList');
const profileListEl = document.getElementById('profileList');
const kbCountEl = document.getElementById('kbCount');
const profileCountEl = document.getElementById('profileCount');
const siloEl = document.getElementById('silo');
const siloToggleEl = document.getElementById('siloToggle');

kbCountEl.textContent = KB.length;
profileCountEl.textContent = PROFILES.length;

function scrollToBottom() {
  threadEl.scrollTop = threadEl.scrollHeight;
}

function addUserMessage(text) {
  const wrap = document.createElement('div');
  wrap.className = 'msg user';
  wrap.innerHTML = `<div class="bubble"></div>`;
  wrap.querySelector('.bubble').textContent = text;
  threadEl.appendChild(wrap);
  scrollToBottom();
}

function addTyping() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.id = 'typingIndicator';
  wrap.innerHTML = `<div class="bubble typing"><span></span><span></span><span></span></div>`;
  threadEl.appendChild(wrap);
  scrollToBottom();
  return wrap;
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str || '';
  return div.innerHTML;
}

function addBotAnswer(match) {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';

  if (!match) {
    wrap.innerHTML = `<div class="bubble">
      Não encontrei nada parecido na base de soluções. Tenta descrever de outro
      jeito, colar a mensagem de erro exata, ou usar uma das palavras-chave ao lado.
      Se continuar sem solução, abre um chamado com a equipe de TI.
    </div>`;
    threadEl.appendChild(wrap);
    scrollToBottom();
    return;
  }

  const { entry } = match.item;
  let html = '';

  if (entry.erro) {
    html += `<span class="err-tag">${escapeHtml(entry.erro.split('\n')[0])}</span><br>`;
  }
  html += `<strong>Solução:</strong><br>${escapeHtml(entry.solucao || 'Sem solução registrada para este caso.')}`;
  if (entry.palavra_chave) {
    const tags = entry.palavra_chave.split(/\s{2,}|\n/).map(t => t.trim()).filter(Boolean);
    html += '<div>' + tags.map(t => `<span class="kw-tag">${escapeHtml(t)}</span>`).join('') + '</div>';
  }

  wrap.innerHTML = `<div class="bubble">${html}</div>`;
  threadEl.appendChild(wrap);
  scrollToBottom();
}

function addProfileAnswer(profiles) {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  let html = '';

  if (profiles.length === 1) {
    const p = profiles[0];
    html += `<span class="kw-tag">PERFIL</span><br>`;
    html += `<strong>Nome:</strong> ${escapeHtml(p.nome)}<br>`;
    html += `<strong>Código:</strong> ${escapeHtml(String(p.codigo))}`;
    if (p.aplicar_parametros) {
      html += `<br><br><strong>Parâmetros a aplicar:</strong><br>${escapeHtml(p.aplicar_parametros)}`;
    }
  } else {
    html += `<strong>Encontrei mais de um perfil parecido:</strong><br><br>`;
    html += profiles
      .map(p => `• ${escapeHtml(p.nome)} — código <strong>${escapeHtml(String(p.codigo))}</strong>`)
      .join('<br>');
    html += `<br><br>Digita o nome completo ou o código pra eu confirmar qual é.`;
  }

  wrap.innerHTML = `<div class="bubble">${html}</div>`;
  threadEl.appendChild(wrap);
  scrollToBottom();
}

function handleQuery(query) {
  addUserMessage(query);
  inputEl.value = '';
  const typingEl = addTyping();

  setTimeout(() => {
    typingEl.remove();

    // 1) o usuário mencionou um código de perfil conhecido?
    const codeMatches = tryProfileByCode(query);
    if (codeMatches) {
      addProfileAnswer(codeMatches);
      return;
    }

    // 2) o texto bate com o nome de um perfil?
    const nameMatches = tryProfileByName(query);
    if (nameMatches) {
      addProfileAnswer(nameMatches);
      return;
    }

    // 3) cai para a base de soluções de chamados
    const matches = findBestMatches(query, 1);
    addBotAnswer(matches[0]);
  }, 380);
}

formEl.addEventListener('submit', e => {
  e.preventDefault();
  const val = inputEl.value.trim();
  if (!val) return;
  handleQuery(val);
});

/* ---------- lista de assuntos (sidebar) ---------- */

function buildTopics() {
  const seen = new Set();
  const topics = [];

  KB.forEach(entry => {
    let label = (entry.palavra_chave || entry.erro || entry.pergunta || '').split(/\n/)[0];
    label = label.trim();
    if (!label) return;
    // usa só o primeiro grupo de palavra-chave se houver várias
    label = label.split(/\s{2,}/)[0];
    const key = normalize(label);
    if (!key || seen.has(key)) return;
    seen.add(key);
    topics.push(label);
  });

  topics.slice(0, 24).forEach(label => {
    const btn = document.createElement('button');
    btn.className = 'topic-btn';
    btn.type = 'button';
    btn.textContent = label.length > 46 ? label.slice(0, 44) + '…' : label;
    btn.addEventListener('click', () => {
      handleQuery(label);
      if (window.innerWidth <= 820) siloEl.classList.remove('open');
    });
    topicListEl.appendChild(btn);
  });
}

buildTopics();

/* ---------- lista de perfis (sidebar) ---------- */

function buildProfileShortcuts() {
  const sorted = [...PROFILES].sort((a, b) => a.nome.localeCompare(b.nome, 'pt-BR'));

  sorted.slice(0, 20).forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'topic-btn';
    btn.type = 'button';
    const label = `${p.nome} · ${p.codigo}`;
    btn.textContent = label.length > 46 ? label.slice(0, 44) + '…' : label;
    btn.addEventListener('click', () => {
      handleQuery(p.nome);
      if (window.innerWidth <= 820) siloEl.classList.remove('open');
    });
    profileListEl.appendChild(btn);
  });
}

buildProfileShortcuts();

/* ---------- sidebar mobile ---------- */

siloToggleEl.addEventListener('click', () => {
  siloEl.classList.toggle('open');
});

/* ---------- mensagem inicial ---------- */

function addWelcome() {
  const wrap = document.createElement('div');
  wrap.className = 'msg bot';
  wrap.innerHTML = `<div class="bubble">
    Oi! Eu busco na base de chamados e na lista de perfis do Agrosys / Senior.
    Descreve um problema, cola a mensagem de erro, pergunta o código de um perfil
    pelo nome (ou o nome pelo código), ou escolhe um item ao lado.
  </div>`;
  threadEl.appendChild(wrap);
}

addWelcome();
