node {
    checkout scm

    stage('build') {
        nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh', 
             nvmIoJsOrgMirror: 'https://iojs.org/dist',
             nvmNodeJsOrgMirror: 'https://nodejs.org/dist', 
             version: '10.16.0') {
                    sh "apt-get update"
                    sh "apt-get install gcc g++ make -y"
                    sh "npm install --legacy-peer-deps"
                    echo "Build main site distribution"
              }

    }

    stage('Deploy') {
        echo "Deploy Start"
        sshagent(credentials: ['kic_key']) {
                    echo "sshagent start"
                    sh '''
                        ssh -o StrictHostKeyChecking=no centos@210.109.63.198 -p 10001 uptime
                        scp -r -P 10001 /var/jenkins_home/workspace/forCloud_Frontend_Pipeline centos@210.109.63.198:/home/centos/Frontend
                        ssh -t centos@210.109.63.198 -p 10001 ./deploy.sh
                    '''
                    echo "Success"
        }
    }

}
