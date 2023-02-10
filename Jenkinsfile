node {
    checkout scm
    
    stage('build') {
        nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh', 
             nvmIoJsOrgMirror: 'https://iojs.org/dist',
             nvmNodeJsOrgMirror: 'https://nodejs.org/dist', 
             version: '16.19.0') {
                    sh "node -v"
//                     sh "apt-get update"
//                     sh "apt-get install gcc g++ make -y"
                    sh "npm install --legacy-peer-deps"
                    echo "Build main site distribution"
                    sh "CI=false npm run build"
                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "Frontend Build Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
              }

    }

    stage('Deploy') {
        echo "Deploy Start"
        sshagent(credentials: ['kic_key']) {
                    echo "sshagent start"
                    sh '''
                        ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10001 uptime
                        ssh -t -t centos@210.109.60.60 -p 10001 ./please.sh
                        scp -r -P 10001 /var/jenkins_home/workspace/forCloud_Frontend_Pipeline/build centos@210.109.60.60:/home/centos/Frontend
                        ssh -t -t centos@210.109.60.60 -p 10001 ./deploy.sh
                    '''
                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-1-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                    echo "Web_1_Success"
                    sh ''' 
                        ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10002 uptime
                        ssh -t -t centos@210.109.60.60 -p 10002 ./please.sh
                        scp -r -P 10002 /var/jenkins_home/workspace/forCloud_Frontend_Pipeline/build centos@210.109.60.60:/home/centos/Frontend
                        ssh -t -t centos@210.109.60.60 -p 10002 ./deploy.sh
                    '''
                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-2-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                    echo "Web_2_Success"
        }
    }

}
