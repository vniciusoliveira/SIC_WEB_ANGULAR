pipeline {
    agent any

    environment {
        // Variáveis de ambiente
        NODE_VERSION = '18.x'
        NPM_CONFIG_CACHE = "${WORKSPACE}/.npm"
        
        // Credenciais e configurações do IIS
        SSH_CREDENTIALS = credentials('jenkinsdeploy_cred')
        APPCMD = 'C:\\Windows\\System32\\inetsrv\\appcmd.exe'
        SITE_NAME = 'TMKT-ZL-WA06'
        REMOTE_HOST = 'tmkt-zl-wa06.tmkt.servicos.mkt'
        
        // Configurações do aplicativo
        POOL_NAME = 'ANGULAR_APP_TESTE'
        SITE_PATH = '/ANGULAR_APP_TESTE'
        PHYSICAL_PATH = 'E:\\WEBSITES\\TMKT_TESTE\\ANGULAR_APP'
    }

    stages {
        stage('Determinar Ambiente') {
            steps {
                script {
                    switch(env.BRANCH_NAME) {
                        case 'main':
                            env.AMBIENTE = 'producao'
                            env.POOL_NAME = 'ANGULAR_APP_PROD'
                            env.SITE_PATH = '/ANGULAR_APP'
                            env.PHYSICAL_PATH = 'E:\\WEBSITES\\TMKT\\ANGULAR_APP'
                            break
                        case 'Development':
                            env.AMBIENTE = 'homologacao'
                            env.POOL_NAME = 'ANGULAR_APP_HML'
                            env.SITE_PATH = '/ANGULAR_APP_HML'
                            env.PHYSICAL_PATH = 'E:\\WEBSITES\\TMKT_HML\\ANGULAR_APP'
                            break
                        default:
                            env.AMBIENTE = 'teste'
                            break
                    }
                    echo "Ambiente determinado: ${env.AMBIENTE}"
                }
            }
        }

        // ... existing stages (Preparação do Ambiente, Instalação de Dependências, Lint, Testes) ...

        stage('Build') {
            steps {
                echo 'Compilando o projeto...'
                nodejs(nodeJSInstallationName: 'NodeJS 18.x') {
                    sh 'npm run build -- --configuration=production'
                }
            }
        }

        //stage('IIS Pool') {
        //    when {
        //        expression { env.AMBIENTE == 'producao' }
        //    }
        //    steps {
        //        script {
        //            withCredentials([usernamePassword(credentialsId: 'jenkinsdeploy_cred', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PSW')]) {
        //                try {
        //                    if (checkPoolExists()) {
        //                        echo "O pool '${env.POOL_NAME}' foi encontrado!"
        //                        def poolState = checkPoolState()
        //                        
        //                        if (!poolState.contains("Stopped")) {
        //                            echo "O pool está em execução. Parando..."
        //                            executeRemoteCommand("${env.APPCMD} stop apppool /apppool.name:${env.POOL_NAME}")
        //                        }
        //                    } else {
        //                        echo "Criando novo pool '${env.POOL_NAME}'..."
        //                        executeRemoteCommand("""
        //                            ${env.APPCMD} add apppool /name:${env.POOL_NAME} && \
        //                            ${env.APPCMD} set apppool /apppool.name:${env.POOL_NAME} /managedRuntimeVersion:\"\" && \
        //                            ${env.APPCMD} set apppool /apppool.name:${env.POOL_NAME} /managedPipelineMode:Integrated
        //                        """)
        //                    }
        //                } catch (Exception e) {
        //                    error "Falha na configuração do pool IIS: ${e.message}"
        //                }
        //            }
        //        }
        //    }
        //}
//
        //stage('Deploy') {
        //    when {
        //        expression { env.AMBIENTE == 'producao' }
        //    }
        //    steps {
        //        script {
        //            if (env.AMBIENTE == 'producao') {
        //                input message: 'Deseja prosseguir com o deploy em PRODUÇÃO?', ok: 'Deploy'
        //            }
        //            
        //            sshPublisher(
        //                publishers: [
        //                    sshPublisherDesc(
        //                        configName: env.SITE_NAME,
        //                        transfers: [
        //                            sshTransfer(
        //                                sourceFiles: 'dist/**/*',
        //                                remoteDirectory: "TMKT_${env.AMBIENTE.toUpperCase()}/ANGULAR_APP",
        //                                removePrefix: 'dist',
        //                                cleanRemote: false,
        //                                flatten: false
        //                            )
        //                        ],
        //                        verbose: true
        //                    )
        //                ]
        //            )
        //        }
        //    }
        //}
//
        //stage("Create Site") {
        //    when {
        //        expression { env.AMBIENTE == 'producao' }
        //    }
        //    steps {
        //        script {
        //            withCredentials([usernamePassword(credentialsId: 'jenkinsdeploy_cred', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PSW')]) {
        //                try {
        //                    if (!checkSiteExists()) {
        //                        createSite()
        //                        echo "O site ${env.SITE_NAME}${env.SITE_PATH} foi criado com sucesso!"
        //                    }
        //                } catch (Exception e) {
        //                    error "Falha na configuração do site: ${e.message}"
        //                }
        //            }
        //        }
        //    }
        //}
//
        //stage('Start IIS Pool') {
        //    when {
        //        expression { env.AMBIENTE == 'producao' }
        //    }
        //    steps {
        //        script {
        //            withCredentials([usernamePassword(credentialsId: 'jenkinsdeploy_cred', usernameVariable: 'SSH_USER', passwordVariable: 'SSH_PSW')]) {
        //                try {
        //                    def poolState = checkPoolState()
        //                    if (poolState.contains("Stopped")) {
        //                        executeRemoteCommand("${env.APPCMD} start apppool /apppool.name:${env.POOL_NAME}")
        //                        echo "Pool iniciado com sucesso!"
        //                    }
        //                } catch (Exception e) {
        //                    error "Falha ao iniciar o pool: ${e.message}"
        //                }
        //            }
        //        }
        //    }
        //}
    }

    post {
        success {
            echo "Deploy em ${env.AMBIENTE} realizado com sucesso!"
        }
        failure {
            echo "Falha no deploy em ${env.AMBIENTE}!"
        }
        always {
            cleanWs()
        }
    }
}

// Funções auxiliares para comandos remotos
def executeRemoteCommand(command) {
    return sshCommand(
        remote: [
            name: env.SITE_NAME,
            host: env.REMOTE_HOST,
            user: SSH_USER,
            password: SSH_PSW,
            allowAnyHosts: true
        ],
        command: command
    ).trim()
}

def checkPoolExists() {
    def checkPool = executeRemoteCommand("${env.APPCMD} list apppool ${env.POOL_NAME} 2>&1 || echo 'POOL_NOT_FOUND'")
    return !checkPool.contains('POOL_NOT_FOUND')
}

def checkPoolState() {
    return executeRemoteCommand("${env.APPCMD} list apppool ${env.POOL_NAME} /text:state")
}

def checkSiteExists() {
    def checkSite = executeRemoteCommand("${env.APPCMD} list app | findstr ${env.POOL_NAME} 2>&1 || echo 'SITE_NOT_FOUND'")
    return !checkSite.contains('SITE_NOT_FOUND')
}

def createSite() {
    return executeRemoteCommand("""
        ${env.APPCMD} add app /site.name:"${env.SITE_NAME}" \
        /path:"${env.SITE_PATH}" \
        /physicalPath:"${env.PHYSICAL_PATH}" \
        /applicationPool:"${env.POOL_NAME}"
    """)
}