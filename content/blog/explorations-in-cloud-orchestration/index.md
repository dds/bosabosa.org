---
title: Explorations in Cloud Orchestration
date: 2021-1-4T11:42:00
description: The state of the art in cloud orchestration in January 2021 with Pulumi, k3s, gRPC, tailscale, and more.
tags:
  [
    "k8s",
    "kubernetes",
    "k3s",
    "programming",
    "go",
    "Google",
    "cluster management",
  ]
---

[github workflows]: https://docs.github.com/en/free-pro-team@latest/actions/reference/workflow-syntax-for-github-actions
[react]: https://reactjs.org/
[dave anderson's new kubernetes idea]: https://blog.dave.tf/post/new-kubernetes/
[pulumi guestbook]: https://github.com/pulumi/examples/tree/master/kubernetes-go-guestbook
[jrscott's k3s on raspberrypi]: https://medium.com/coming-about/10-minutes-to-k3s-on-raspberry-pis-efe3daf2a33d
[ingress spec]: https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.20/#ingressspec-v1-networking-k8s-io
[k3s]: https://k3s.io/
[tailscale]: https://tailscale.com/
[tailscale acls]: https://tailscale.com/kb/1018/acls
[ice (rfc 8445)]: https://tools.ietf.org/html/rfc8445
[how nat traversal works]: https://tailscale.com/blog/how-nat-traversal-works/
[tailscale dog cam]: https://tailscale.com/kb/1076/dogcam
[mdx]: https://mdxjs.com/
[oxide]: https://oxide.computer/
[securing the boot process]: https://cacm.acm.org/magazines/2020/3/243026-securing-the-boot-process/fulltext
[raspberrypi kubernetes cluser over tailscale]: https://nativecloud.dev/scale-out-your-raspberry-pi-k3s-cluster-to-the-cloud/
[ec2 terraform for hybrid cloud]: https://github.com/voigt/pinetes/tree/master/terraform
[tailscale home server]: https://mrkaran.dev/posts/home-server-updates/
[openfaas, cert-manager, and k3sup]: https://blog.alexellis.io/tls-the-easy-way-with-openfaas-and-k3sup/
[traefik ingress controller]: https://doc.traefik.io/traefik/v1.7/configuration/backends/kubernetes/
[mailu k8s setup]: https://mailu.io/1.7/kubernetes/mailu/index.html
[digitalocean's tutorial on cert-manager]: https://www.digitalocean.com/community/tutorials/how-to-set-up-an-nginx-ingress-with-cert-manager-on-digitalocean-kubernetes
[kuard]: https://github.com/kubernetes-up-and-running/kuard
[orga]: https://orga.js.org/
[grpc]: https://grpc.io/
[go]: https://go.dev/
[thrift]: https://thrift.apache.org/
[openapi]: https://openapis.org/
[k8s tutorials]: https://kubernetes.io/docs/tutorials/
[faas]: https://en.wikipedia.org/wiki/Function_as_a_service
[openfaas]: https://www.openfaas.com/
[gcp appengine]: https://cloud.google.com/appengine
[aws lambda]: https://aws.amazon.com/lambda/
[kubernetes]: https://kubernetes.io/

Last month, I was able to play with lots of tech that we don't use at work. It
started with setting up automation with [github workflows] to replicate some of
what I've gotten accustomed to at work: configuring GitHub actions for automated
versioning and dependency updates, all controlled through the repo.

I launched this blog to share the experience so I began [learning
gatsby](/b/learning-gatsby). That's been extremely educational and rewarding.
This site is written in a mix of markdown and orgmode files with embedded React
components. I'll never go back. The power in the [MDX] and [Orga] libraries is
bay far the best way I've found to author and manage content.

When I brought this up to a friend, who normally works on more front-end things,
he gave me some advice and also had a question for me: what do I think of using
[gRPC] with [Go] on the back-end with [React] apps on the front-end. That made
me think, "how can I show off a guestbook app powered by gRPC?" Shouldn't be
hard, right? What I would have liked to do is to give him a git branch where he
could just run the gRPC backend on a server-less (or [FaaS]) system like [GCP
AppEngine] or [AWS Lambda]. It turns out you _still cannot_ use gRPC in any of
those environments. gRPC requires a long-running server process (meanwhile, you
_can_ use [thrift]). And that actually makes a ton of sense.

[pi-hole]: https://pi-hole.net/
[five years doing raspberry pi clusters]: https://www.raspberrypi.org/blog/five-years-of-raspberry-pi-clusters/
[micro-k8s]: https://microk8s.io/
[k0s]: https://k0sproject.io/
[alex ellis]: https://www.alexellis.io/
[openfaas architecture]: https://docs.openfaas.com/openfaas-cloud/architecture/
[k3sup]: https://github.com/alexellis/k3sup

Alright, let's make a guestbook server. For some reason, I thought this would be
a neat project to explore the state of the art of [kubernetes] (aka k8s). Maybe,
somewhere in the back of my mind, I had once seen that the official [k8s
tutorials] actually deploy a PHP Guestbook application however I would re-learn
that fact a few days later. I wanted to set up a [k8s][kubernetes] cluster on a
pair of [raspberry pi
4s](https://www.raspberrypi.org/products/raspberry-pi-4-model-b/) I use at home
for various things like [Pi-Hole] for parental controls, network monitoring,
DNS, DHCP, and network booting and OS installs. There are now at least three
alternative distributions of [k8s] to run on your pi: [micro-k8s], [k3s], and
[k0s]. I did a little digging and [Alex Ellis] has spent the last [five years
doing raspberry pi clusters]. He's started the [openfaas] project which, I
believe, will eventually be the model for almost all software. Alex's work is
extremely impressive. Reading about his experience and seeing how
[popular][jrscott's k3s on raspberrypi] and [tested][openfaas, cert-manager, and k3sup] his work is, I chose to use his [k3sup] program to bring up [k3s] on my
pair of pis. It really was as easy as advertised. I was able to rebuild the
cluster a few times in a day and it's now in a shape I'm excited to play with
next time. Great work, Alex!

And [OpenFaaS] does not dictate that you must be server-less. It actually just
runs containers and provides a bunch of attenuating services and some services
over familiar APIs in the cluster. Basically, it's k8s, so you're just going to
be running containers in pods, to which OpenFaaS provides integration points for
things like identity, storage, and more. But the problem is that I still need to
do a lot of setup to get this done and now that December is over and it's back
to the grind-stone, I still don't have OpenFaaS running in the cluster and I've
got other problems to overcome, too, such as:

- Ingress: The [ingress spec] reached stable 1.0 in November 2020. It's still
  quite hard to configure and the docs for the [traefik ingress controller] are
  dense and new to me.
- Off-site resources: Since I'm running this at home, I expect to use [tailscale] to
  integrate my pis with more resources off-site; see [raspberrypi kubernetes
  cluster over tailscale]).
- SSL certificates: Once I have ingress, I need to get SSL/TLS certificates set up;
  see [openfaas, cert-manager, and k3sup] and [digitalocean's tutorial on cert-manager].
- Mail service: The cluster has a domain name and I want to be able to send and
  receive email there; see [mailu k8s setup].

[terraformpy]: https://github.com/NerdWalletOSS/terraformpy
[pulumi]: https://pulumi.com/
[platform team anti-pattern]: https://acloudguru.com/blog/engineering/why-central-cloud-teams-fail-and-how-to-save-yours
[terraform]: https://terraform.io/
[aws cloud formation]: https://aws.amazon.com/cloudformation/

As you can see, there's quite a lot of work left to do. Meanwhile, I discovered
that managing all of this cluster configuration as a set of YAML files was not
going to cut it. And we're no closer to writing the guestbook app 😓. But
there's more to say here because we discovered [pulumi]. Since I'm familiar with
[terraformpy], I'm thrilled to see the concept made into a full-featured
product. What is pulumi? It provides bindings for infrastructure APIs from Go,
Python, JS, TS, and .NET. It can convert or co-exist with [terraform], [AWS
cloud formation], or other config files and let's you write real code which you
can test and factor into how you want the infrastructure and permissions to be
structured. True infrastructure-as-code, not the mess of YAML files. Pulumi is
actually a few years old and has a huge following. I'm surprised I'd not heard
of it. I want to talk to some customers and see how much it costs before
recommending it to my company but I'm very keen to do so if the numbers work
out. Writing the infrastructure with real code, making it importable in other
repos, keeping things factored where they make sense would be what allows us to
refactor it well would ease my organization to break free from the [platform
team anti-pattern]. I found the [pulumi guestbook] example project to be a very
thoughtful and easy to understand factoring of a real infrastructure as code.

[drone]: https://drone.io/
[jenkins]: https://jenkins.io/

Along the way, I noticed the [drone] project and it made me very happy to see a
well contained replacement for [jenkins]. I like that drone makes it so much
easier to build whatever and do whatever with the build data and artifacts. Very
slick, can't wait to explore more.

[gitops]: https://www.gitops.tech/#:~:text=GitOps%20is%20a%20way%20of,Git%20and%20Continuous%20Deployment%20tools.
[systemd]: https://www.freedesktop.org/wiki/Software/systemd/

What does it all mean? Well, it means 2021 is going to be another amazing year
in the technology and internet business. We're a long way from having a simple
solution for managing the software life-cycle and the organizing the teams that
do that work. Do you think the pieces are there in what we see today? [Dave
Anderson's new kubernetes idea] about how a very different k8s, essentially an
add-on to [systemd] for clustering, resonated strongly with me (minus the parts
about IPv6 and kubernetes networking). I think he's right in that such a thing
probably won't be built (any time soon, at least). However, kubernetes will get
much simpler and we will be deploying more with it. I can imagine a self-hosted
pulumi in k8s auto-deployer that gets a team bootstrapped with a cluster that
meets their needs and is easily managed. I can imagine all of the pieces there
so that teams just write code, merge it into the main branch, the code describes
the entire state of its required infrastructure, and away it goes building it.
It's self-healing and self-managed after initial deploy. That is, we're almost
at the state of [GitOps].

As for that gRPC guestbook app, armed with the knowledge above, I'm going to
write it and package it as a container. Adieu till next time 👋
