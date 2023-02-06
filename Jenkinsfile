node {
    checkout scm
    
    stage('build') {
        nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh', 
             nvmIoJsOrgMirror: 'https://iojs.org/dist',
             nvmNodeJsOrgMirror: 'https://nodejs.org/dist', 
             version: '16.19.0') {
                    sh "node -v"
                    sh "apt-get update"
                    sh "apt-get install gcc g++ make -y"
                    sh "npm install --legacy-peer-deps"
                    echo "Build main site distribution"
                    sh "npm run build"
                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "Frontend Build Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
              }

    }

//     stage('Deploy') {
//         echo "Deploy Start"
//         sshagent(credentials: ['kic_key']) {
//                     echo "sshagent start"
//                     slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "Frontend Deploy Start: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
//                     sh '''
//                         ssh -o StrictHostKeyChecking=no centos@210.109.63.198 -p 10002 uptime
//                         ssh -t centos@210.109.63.198 -p 10002 ./please.sh
//                         scp -r -P 10002 /var/jenkins_home/workspace/forCloud_Frontend_Pipeline centos@210.109.63.198:/home/centos/Frontend
//                         ssh -t centos@210.109.63.198 -p 10002 ./deploy.sh
                        
//                         ssh -o StrictHostKeyChecking=no centos@210.109.63.198 -p 10007 uptime
//                         ssh -t centos@210.109.63.198 -p 10007 ./please.sh
//                         scp -r -P 10007 /var/jenkins_home/workspace/forCloud_Frontend_Pipeline centos@210.109.63.198:/home/centos/Frontend
//                         ssh -t centos@210.109.63.198 -p 10007 ./deploy.sh
//                     '''
//                     echo "Success"
                    
//         }
//     }

}
