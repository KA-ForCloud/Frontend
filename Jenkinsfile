node {
    checkout scm
    environment{
        imagename = "lmslmsms0616/teamchat_front"
        registryCredential = 'docker-hub'
        dockerImage = ''
    }
//     stage('build') {
//         nvm(nvmInstallURL: 'https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh', 
//              nvmIoJsOrgMirror: 'https://iojs.org/dist',
//              nvmNodeJsOrgMirror: 'https://nodejs.org/dist', 
//              version: '16.19.0') {
//                     sh "node -v"
// //                     sh "apt-get update"
// //                     sh "apt-get install gcc g++ make -y"
//                     sh "npm install --legacy-peer-deps"
//                     echo "Build main site distribution"
//                     sh "CI=false npm run build"
//                     slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "Frontend Build Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
//               }

//     }

    // docker build
    stage('Bulid Docker') {
      agent any
      steps {
        echo 'Bulid Docker'
        script {
            dockerImage = docker.build imagename
        }
      }
      post {
        failure {
          error 'This pipeline stops here...'
        }
      }
    }
    // docker push
    stage('Push Docker') {
      agent any
      steps {
        echo 'Push Docker'
        script {
            docker.withRegistry( '', registryCredential) {
                dockerImage.push("${currentBuild.number}")  // ex) "1.0"
            }
        }
      }
      post {
        failure {
          error 'This pipeline stops here...'
        }
      }
    }

    stage('Deploy') {
        echo "Deploy Start"
        sshagent(credentials: ['kic_key']) {
                    echo "sshagent start"
                    sh '''
                        ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10001 uptime
                        docker pull lmslmsms0616/teamchat_front:${currentBuild.number}
                        docker ps -q --filter name=front | grep -q . && docker rm -f $(docker ps -aq --filter name=front)
                        docker run -d --name front -p 3000:3000 lmslmsms0616/teamchat_front:${currentBuild.number}
                    '''
                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-1-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                    echo "Web_1_Success"
                    sh ''' 
                        ssh -o StrictHostKeyChecking=no centos@210.109.60.60 -p 10002 uptime
                        docker pull lmslmsms0616/teamchat_front:${currentBuild.number}
                        docker ps -q --filter name=front | grep -q . && docker rm -f $(docker ps -aq --filter name=front)
                        docker run -d --name front -p 3000:3000 lmslmsms0616/teamchat_front:${currentBuild.number}
                    '''
                    slackSend (channel: '#jenkins-alert', color: '#FFFF00', message: "WEB-2-Frontend Deploy Complete: Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                    echo "Web_2_Success"
        }
    }

}
