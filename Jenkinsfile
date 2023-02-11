node {
    checkout scm
    environment{
        imagename = "lmslmsms0616/teamchat_front"
        registryCredential = 'docker-hub'
        dockerImage = ''
    }
    // docker build
    stage('Bulid Docker') {
        echo 'Bulid Docker'
        script {
            dockerImage = docker.build imagename
        }
    }
    // docker push
    stage('Push Docker') {
        echo 'Push Docker'
        script {
            docker.withRegistry( '', registryCredential) {
                dockerImage.push("${currentBuild.number}")  // ex) "1.0"
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
