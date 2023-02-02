pipeline {
    checkout scm
    stages {
        stage('build') {
            sh "echo $PATH"
            nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh', 
                 nvmIoJsOrgMirror: 'https://iojs.org/dist',
                 nvmNodeJsOrgMirror: 'https://nodejs.org/dist', 
                 version: '10.16.0') {
                        sh "apt-get install build-essential -y"
                        sh "npm install"
                        echo "Build main site distribution"
                        sh "npm run build"
                  }

        }
        stage('Deploy') {
                steps {
                    echo "Deploy Start"
                    sshagent(credentials: ['kic_key']) {
                        echo "sshagent start"
                        sh '''
                            ssh -o StrictHostKeyChecking=no centos@210.109.63.198 -p 10001 uptime
                            scp /var/jenkins_home/workspace/forCloud_Backend_Pipeline/build/libs/backend-0.0.1-SNAPSHOT.jar centos@210.109.63.198 -p 10001:/home/centos/Backend
                            ssh -t centos@210.109.63.198 -p 10001 ./deploy.sh
                        '''
                        echo "Success"
                    }
                }
        }
    }
}
