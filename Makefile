TF = docker-compose run --rm tf

deploy: apply
	cd web-source && \
		aws s3 sync ./ \
		s3://cameroncraddock.net

apply: plan
	$(TF) apply $(TF_WORKSPACE).tfplan
	rm $(TF_WORKSPACE).tfplan

plan: init
	$(TF) plan -out $(TF_WORKSPACE).tfplan

init:
	$(TF) init