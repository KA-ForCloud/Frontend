node {
    checkout scm
    
    stage('Git Clone') {
        steps {
                git branch: 'cicdtest', url: 'https://github.com/KA-ForCloud/Frontend.git'
        }
    }
    
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
}
